// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ISwapper {
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function balanceOf(address owner) external returns (uint);
}

contract Swapper {
    /**
     * @dev Declaration of State Variables
     */
    address constant tokenA = 0x79b90f2237304DfaA519Bfab5893eD541Aa49fF1;
    address constant tokenB = 0x2c2145782d2465600Dd81A44fDaD4E7393ac218a;

    uint reserveA; // The reserve pool of tokenA
    uint reserveB; // The reserve pool of tokenB
    uint totalReserve; // The total reserve pool for the tokens

    struct LiquidityProvider {
        uint amountA;
        uint amountB;
    }

    mapping(address => LiquidityProvider) liquidityProvider;

    event SwappedLogs(address _swapper, uint amountToSwap, uint amountReceived);
    event LiquidityLogs(address _addr, uint _amountA, uint _amountB);

    constructor() {}

    function CPMM(uint _fromToken, uint _toToken) internal {}

    function updateReserve(
        uint _reserveA,
        uint _reserveB
    ) internal pure returns (uint) {
        return _reserveA * _reserveB;
    }

    // a sample code of how the addLiquidity function should be like
    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        IERC20(tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), _amountB);
        reserveA += _amountA;
        reserveB += _amountB;

        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA += _amountA;
        provider.amountB += _amountB;

        // Calculate the totalReserve
        // totalReserve = reserveA * reserveB;
        updateReserve(reserveA, reserveB);

        emit LiquidityLogs(msg.sender, _amountA, _amountB);
    }

    function withdraw(uint _amount) external payable {
        require(address(this).balance > 0, "Nothing to withdraw");
        require(address(this).balance > _amount, "Insufficient balance");
        payable(address(this)).transfer(_amount);
    }

    function swapTokenAForB(uint _fromTokenAmount) external returns (uint) {
        // a. Swap token A for B
        // b. Remove Token A from the pool
        // c. Add Token B to the pool
        uint swappedValue = reserveB -
            (totalReserve / (reserveA + _fromTokenAmount));

        reserveA -= swappedValue;
        reserveB += _fromTokenAmount;

        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA -= swappedValue;
        provider.amountB += _fromTokenAmount;

        updateReserve(reserveA, reserveB);

        // Transfer the swapped value to the tokenContract
        // Reduce tokenB balance
        IERC20(tokenB).transferFrom(msg.sender, address(this), swappedValue);

        emit SwappedLogs(msg.sender, _fromTokenAmount, swappedValue);
        return swappedValue;
    }

    function swapTokenBForA(uint _toTokenAmount) external returns (uint) {
        // a. Swap token B for A
        // b. Remove Token B from the pool
        // c. Add Token A to the pool
        uint swappedValue = (totalReserve / (reserveB - _toTokenAmount)) -
            reserveA;

        reserveB -= swappedValue;
        reserveA += _toTokenAmount;

        LiquidityProvider storage provider = liquidityProvider[msg.sender];
        provider.amountA += swappedValue;
        provider.amountB -= _toTokenAmount;

        updateReserve(reserveA, reserveB);

        // Transfer the swapped value to the tokenContract
        // Reduce tokenA balance
        IERC20(tokenA).transferFrom(msg.sender, address(this), swappedValue);

        emit SwappedLogs(msg.sender, _toTokenAmount, swappedValue);
        return swappedValue;
    }

    function getTransaction(
        address _addr
    ) external view returns (LiquidityProvider memory) {
        return liquidityProvider[_addr];
    }
}
