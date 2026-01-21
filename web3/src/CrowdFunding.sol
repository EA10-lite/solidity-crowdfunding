// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool exists;
    }

    // campaign ID => Campaign;
    mapping(uint256 => Campaign) public campaigns;
    bool locked;

    event CampainCreated(uint256 indexed id, string title);
    event DonatedToCampaign(uint256 indexed id, address indexed user, uint256 indexed amount, uint256 timestamp);

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline should be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.exists = true;

        emit CampainCreated(numberOfCampaigns, _title);

        numberOfCampaigns++;

        return numberOfCampaigns;
    }

    function donateToCampaign(uint256 _id) public payable nonReentrant() {
        Campaign storage campaign = campaigns[_id];
        uint256 amount = msg.value;

        require(amount > 0, "Not Enough Donation");
        require(campaign.exists, "Campaign not found");
        require(campaign.deadline > block.timestamp, "Campaign Expired");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.amountCollected += amount;


        (bool sent, ) = payable(campaign.owner).call{ value: amount }("");
        require(sent, "Failed to donate");

        emit DonatedToCampaign(_id, msg.sender, amount, block.timestamp);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint256 i = 0; i < allCampaigns.length; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getDonations(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        Campaign memory campaign = campaigns[_id];
        return (campaign.donators, campaign.donations);
    }

    modifier nonReentrant() {
        _nontReentrantBefore();
        _;
        _nontReentrantAfter();
    }

    function _nontReentrantBefore() internal {
        require(!locked, "Reentrancy detected");
        locked = true;
    }

    function _nontReentrantAfter() internal {
        locked = false;
    }
}