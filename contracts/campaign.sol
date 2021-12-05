// SPDX-License-Identifier: MIT
 
pragma solidity >=0.6.0 <0.9.0;
 
interface IBEP20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
 
    /**
     * @dev Returns the token decimals.
     */
    function decimals() external view returns (uint8);
 
    /**
     * @dev Returns the token symbol.
     */
    function symbol() external view returns (string memory);
 
    /**
     * @dev Returns the token name.
     */
    function name() external view returns (string memory);
 
    /**
     * @dev Returns the bep token owner.
     */
    function getOwner() external view returns (address);
 
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
 
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
 
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address _owner, address spender) external view returns (uint256);
 
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
 
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
 
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);
 
    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
contract CampaignGenerator {
 
    address[] public campaigns;
    struct campaign {
        uint index;
        address manager;
    }
 
    mapping(address => campaign) campaignStructs;
 
    function createCampaign(string memory name, uint goal, address token) public {
        require(bytes(name).length > 0);
        address newCampaign = address(new Campaign(name, goal, msg.sender, token));
        campaigns.push(newCampaign);
        campaignStructs[newCampaign].index = campaigns.length - 1;
        campaignStructs[newCampaign].manager = msg.sender;
 
        // event 
 
        emit CampaignCreated(newCampaign);
    }
 
    event CampaignCreated(address campaignAddress);
 
    // Getter to read all avaliable campaigns
    function getAllCampaigns() public view returns(address[] memory) {
        return campaigns;
    }
 
}
 
contract Campaign {
 
    // Request struct
    struct Request {
        uint256 value;
        address receiver;
    }
    Request[] public requests;
 
    // Funders struct
    address[] public funders;
 
    // Campaign variables
    address public manager;
    string public name;
    uint256 public totalDonatedTokens = 0;
    uint256 public goal;
    IBEP20 public token;
    bool public isActive = true;

    // Donators variables
    mapping(address=>uint256) public fundersValue;

    constructor(string memory _name, uint256 _goal, address _manager, address _token) {
        name = _name;
        manager = _manager;
        goal = _goal;
        token = IBEP20(_token);
    }
 
    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
 
    // Getters and Setters TODO: ownership transfer
    // TEST: BUSD - 0x78867bbeef44f2326bf8ddd1941a4439382ef2a7
    // Max int- 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

    // Campaign Logic
    function participate(uint256 amount) public payable {
        require(amount > 0, "Nothing to deposit");
        require(isActive, "Campaign is not currently active.");
        require(totalDonatedTokens + amount <= goal, "Goal has been surpassed.");
        require(token.allowance(msg.sender, address(this)) >= amount, "set allowance pl0x");
        token.transferFrom(msg.sender, address(this), amount);
 
        // TODO: need to think about existence
        if (fundersValue[msg.sender] == 0) {
            funders.push(msg.sender);
        }
        fundersValue[msg.sender] += amount;
        totalDonatedTokens += amount;
    }
 
    function managerWithdraw(uint256 amount) public onlyManager {
        require(amount <= totalDonatedTokens, "Not enough monies.");
        token.transfer(payable(manager), amount);
    }
 
    function payParticipants(uint256 amount) public onlyManager{
        require(amount > 0, "Please pay your investors something!");
        for (uint i = 0; i < funders.length; i++) {
            // For now we send from wallet.

            // caution, check safe-to-multiply here TODO: fix
            uint256 _numerator  = fundersValue[funders[i]] * 10 ** (18+1);
            // with rounding of last digit
            uint256 _quotient =  ((_numerator / totalDonatedTokens) + 5) / 10;

            token.transferFrom(msg.sender, funders[i], amount * _quotient);
        }
    }

    function setActive(bool _bool) public onlyManager {
        isActive = _bool;
    }

 
}