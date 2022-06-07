// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "../uniswapv2/UniswapV2Factory.sol";

contract DefiKingdomSwapFactoryMock is UniswapV2Factory {
    constructor(address _feeToSetter) public UniswapV2Factory(_feeToSetter) {}
}
