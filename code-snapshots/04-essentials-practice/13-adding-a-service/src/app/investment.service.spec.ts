import { TestBed } from '@angular/core/testing';
import { InvestmentService } from './investment.service';
import { InvestmentInput } from './investment-input.model';

/**
 * Comprehensive unit tests for InvestmentService
 * Tests investment calculation logic, data handling, edge cases,
 * and error scenarios following Angular testing best practices
 */
describe('InvestmentService', () => {
  let service: InvestmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentService);
  });

  afterEach(() => {
    // Reset service state after each test
    service.resultData = undefined;
  });

  /**
   * Test service creation and dependency injection
   * Verifies that the service can be properly instantiated
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test service initialization state
   * Verifies that the service starts with undefined result data
   */
  it('should initialize with undefined resultData', () => {
    expect(service.resultData).toBeUndefined();
  });

  describe('calculateInvestmentResults', () => {
    /**
     * Test basic investment calculation with valid input
     * Verifies correct calculation logic for standard investment scenario
     */
    it('should calculate investment results with valid input', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 1000,
        expectedReturn: 5,
        duration: 3,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(3);

      // Test first year calculations
      const firstYear = service.resultData![0];
      expect(firstYear.year).toBe(1);
      expect(firstYear.annualInvestment).toBe(1000);
      expect(firstYear.interest).toBe(500); // 10000 * 0.05
      expect(firstYear.valueEndOfYear).toBe(11500); // 10000 + 500 + 1000
      expect(firstYear.totalAmountInvested).toBe(11000); // 10000 + 1000
      expect(firstYear.totalInterest).toBe(500);
    });

    /**
     * Test investment calculation with zero initial investment
     * Verifies handling of edge case with no initial capital
     */
    it('should handle zero initial investment', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 0,
        annualInvestment: 1000,
        expectedReturn: 5,
        duration: 2,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(2);

      const firstYear = service.resultData![0];
      expect(firstYear.interest).toBe(0); // 0 * 0.05
      expect(firstYear.valueEndOfYear).toBe(1000); // 0 + 0 + 1000
      expect(firstYear.totalAmountInvested).toBe(1000);
    });

    /**
     * Test investment calculation with zero annual investment
     * Verifies calculation when only initial investment grows
     */
    it('should handle zero annual investment', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 0,
        expectedReturn: 10,
        duration: 2,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(2);

      const firstYear = service.resultData![0];
      expect(firstYear.interest).toBe(1000); // 10000 * 0.10
      expect(firstYear.valueEndOfYear).toBe(11000); // 10000 + 1000 + 0
      expect(firstYear.annualInvestment).toBe(0);
      expect(firstYear.totalAmountInvested).toBe(10000);
    });

    /**
     * Test investment calculation with zero expected return
     * Verifies calculation when there's no interest earned
     */
    it('should handle zero expected return', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 1000,
        expectedReturn: 0,
        duration: 2,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(2);

      const firstYear = service.resultData![0];
      expect(firstYear.interest).toBe(0);
      expect(firstYear.valueEndOfYear).toBe(11000); // 10000 + 0 + 1000
      expect(firstYear.totalInterest).toBe(0);
    });

    /**
     * Test investment calculation with one year duration
     * Verifies minimum duration scenario
     */
    it('should handle single year duration', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 5000,
        annualInvestment: 500,
        expectedReturn: 8,
        duration: 1,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(1);

      const result = service.resultData![0];
      expect(result.year).toBe(1);
      expect(result.interest).toBe(400); // 5000 * 0.08
      expect(result.valueEndOfYear).toBe(5900); // 5000 + 400 + 500
      expect(result.totalAmountInvested).toBe(5500);
      expect(result.totalInterest).toBe(400);
    });

    /**
     * Test investment calculation with zero duration
     * Verifies edge case handling for no investment period
     */
    it('should handle zero duration', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 1000,
        expectedReturn: 5,
        duration: 0,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(0);
    });

    /**
     * Test investment calculation with high return rate
     * Verifies calculation accuracy with large percentage returns
     */
    it('should handle high expected return rates', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 1000,
        annualInvestment: 100,
        expectedReturn: 50, // 50% return
        duration: 2,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(2);

      const firstYear = service.resultData![0];
      expect(firstYear.interest).toBe(500); // 1000 * 0.50
      expect(firstYear.valueEndOfYear).toBe(1600); // 1000 + 500 + 100

      const secondYear = service.resultData![1];
      expect(secondYear.interest).toBe(800); // 1600 * 0.50
      expect(secondYear.valueEndOfYear).toBe(2500); // 1600 + 800 + 100
    });

    /**
     * Test investment calculation with fractional values
     * Verifies calculation precision with decimal inputs
     */
    it('should handle fractional investment values', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 1000.5,
        annualInvestment: 100.25,
        expectedReturn: 5.5,
        duration: 1,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(1);

      const result = service.resultData![0];
      expect(result.interest).toBeCloseTo(55.0275, 4); // 1000.50 * 0.055
      expect(result.valueEndOfYear).toBeCloseTo(1155.7775, 4);
      expect(result.totalAmountInvested).toBe(1100.75);
    });

    /**
     * Test compound interest calculation over multiple years
     * Verifies that interest compounds correctly year over year
     */
    it('should correctly calculate compound interest over multiple years', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 1000,
        annualInvestment: 0,
        expectedReturn: 10,
        duration: 3,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(3);

      // Year 1: 1000 + (1000 * 0.10) = 1100
      expect(service.resultData![0].valueEndOfYear).toBe(1100);

      // Year 2: 1100 + (1100 * 0.10) = 1210
      expect(service.resultData![1].valueEndOfYear).toBe(1210);

      // Year 3: 1210 + (1210 * 0.10) = 1331
      expect(service.resultData![2].valueEndOfYear).toBe(1331);
    });

    /**
     * Test total interest calculation accuracy
     * Verifies that total interest is calculated correctly over time
     */
    it('should calculate total interest correctly', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 5000,
        annualInvestment: 1000,
        expectedReturn: 6,
        duration: 2,
      };

      service.calculateInvestmentResults(investmentInput);

      const firstYear = service.resultData![0];
      const secondYear = service.resultData![1];

      // First year: interest = 5000 * 0.06 = 300
      expect(firstYear.totalInterest).toBe(300);

      // Second year: previous total + new interest
      const expectedSecondYearInterest = 6300 * 0.06; // 378
      expect(secondYear.totalInterest).toBeCloseTo(678, 0); // 300 + 378
    });

    /**
     * Test total amount invested calculation
     * Verifies that total invested amount accumulates correctly
     */
    it('should calculate total amount invested correctly', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 2000,
        annualInvestment: 500,
        expectedReturn: 7,
        duration: 3,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData![0].totalAmountInvested).toBe(2500); // 2000 + 500
      expect(service.resultData![1].totalAmountInvested).toBe(3000); // 2000 + 2*500
      expect(service.resultData![2].totalAmountInvested).toBe(3500); // 2000 + 3*500
    });

    /**
     * Test that previous calculation results are overwritten
     * Verifies that new calculations replace old results
     */
    it('should overwrite previous calculation results', () => {
      const firstInput: InvestmentInput = {
        initialInvestment: 1000,
        annualInvestment: 100,
        expectedReturn: 5,
        duration: 2,
      };

      const secondInput: InvestmentInput = {
        initialInvestment: 2000,
        annualInvestment: 200,
        expectedReturn: 10,
        duration: 1,
      };

      service.calculateInvestmentResults(firstInput);
      expect(service.resultData!.length).toBe(2);

      service.calculateInvestmentResults(secondInput);
      expect(service.resultData!.length).toBe(1);
      expect(service.resultData![0].valueEndOfYear).toBe(2400); // 2000 + 200 + 200
    });
  });

  describe('Data Validation and Edge Cases', () => {
    /**
     * Test service behavior with negative initial investment
     * Verifies handling of invalid negative values
     */
    it('should handle negative initial investment', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: -1000,
        annualInvestment: 500,
        expectedReturn: 5,
        duration: 1,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      expect(service.resultData!.length).toBe(1);

      const result = service.resultData![0];
      expect(result.interest).toBe(-50); // -1000 * 0.05
      expect(result.valueEndOfYear).toBe(-550); // -1000 + (-50) + 500
    });

    /**
     * Test service behavior with negative annual investment
     * Verifies handling of withdrawal scenarios
     */
    it('should handle negative annual investment (withdrawals)', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: -1000, // Withdrawal
        expectedReturn: 5,
        duration: 1,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      const result = service.resultData![0];
      expect(result.interest).toBe(500);
      expect(result.valueEndOfYear).toBe(9500); // 10000 + 500 - 1000
      expect(result.annualInvestment).toBe(-1000);
    });

    /**
     * Test service behavior with negative expected return
     * Verifies handling of market loss scenarios
     */
    it('should handle negative expected return (market losses)', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 10000,
        annualInvestment: 1000,
        expectedReturn: -10, // 10% loss
        duration: 1,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      const result = service.resultData![0];
      expect(result.interest).toBe(-1000); // 10000 * -0.10
      expect(result.valueEndOfYear).toBe(10000); // 10000 - 1000 + 1000
      expect(result.totalInterest).toBe(-1000);
    });

    /**
     * Test service behavior with very large numbers
     * Verifies calculation accuracy with large investment amounts
     */
    it('should handle very large investment amounts', () => {
      const investmentInput: InvestmentInput = {
        initialInvestment: 1000000,
        annualInvestment: 100000,
        expectedReturn: 5,
        duration: 1,
      };

      service.calculateInvestmentResults(investmentInput);

      expect(service.resultData).toBeDefined();
      const result = service.resultData![0];
      expect(result.interest).toBe(50000); // 1000000 * 0.05
      expect(result.valueEndOfYear).toBe(1150000);
      expect(result.totalAmountInvested).toBe(1100000);
    });

    /**
     * Test service state consistency after multiple calculations
     * Verifies that service maintains consistent state
     */
    it('should maintain consistent state after multiple calculations', () => {
      const inputs = [
        {
          initialInvestment: 1000,
          annualInvestment: 100,
          expectedReturn: 5,
          duration: 1,
        },
        {
          initialInvestment: 2000,
          annualInvestment: 200,
          expectedReturn: 10,
          duration: 2,
        },
        {
          initialInvestment: 500,
          annualInvestment: 50,
          expectedReturn: 3,
          duration: 3,
        },
      ];

      inputs.forEach((input) => {
        service.calculateInvestmentResults(input);
        expect(service.resultData).toBeDefined();
        expect(service.resultData!.length).toBe(input.duration);
        expect(
          service.resultData!.every(
            (result) =>
              result.year > 0 &&
              typeof result.interest === 'number' &&
              typeof result.valueEndOfYear === 'number',
          ),
        ).toBe(true);
      });
    });
  });
});
