// SPDX-License-Identifier: MIT
// Run using https://remix.ethereum.org
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function decrement() public {
        require(count > 0, "Cannot go below zero");
        count -= 1;
    }
}

