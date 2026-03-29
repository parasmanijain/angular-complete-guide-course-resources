import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Permission } from './auth.model';

/**
 * Comprehensive unit tests for AuthService
 * Tests authentication logic, permission management, signal state,
 * edge cases, and error scenarios following Angular testing best practices
 */
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    // Reset service state after each test
    service.activePermission.set('guest');
  });

  /**
   * Test service creation and dependency injection
   * Verifies that the service can be properly instantiated
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test service initialization with default permission
   * Verifies that the service starts with guest permission
   */
  it('should initialize with guest permission', () => {
    expect(service.activePermission()).toBe('guest');
  });

  /**
   * Test that activePermission is a signal
   * Verifies the signal functionality and reactivity
   */
  it('should have activePermission as a signal', () => {
    expect(typeof service.activePermission).toBe('function');
    expect(typeof service.activePermission.set).toBe('function');
  });

  describe('authenticate', () => {
    /**
     * Test successful admin authentication
     * Verifies that correct admin credentials grant admin permission
     */
    it('should authenticate admin user with correct credentials', () => {
      service.authenticate('admin@example.com', 'admin');
      
      expect(service.activePermission()).toBe('admin');
    });

    /**
     * Test successful user authentication
     * Verifies that correct user credentials grant user permission
     */
    it('should authenticate regular user with correct credentials', () => {
      service.authenticate('user@example.com', 'user');
      
      expect(service.activePermission()).toBe('user');
    });

    /**
     * Test authentication failure with invalid admin credentials
     * Verifies that wrong admin password results in guest permission
     */
    it('should set guest permission for invalid admin credentials', () => {
      service.authenticate('admin@example.com', 'wrongpassword');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication failure with invalid user credentials
     * Verifies that wrong user password results in guest permission
     */
    it('should set guest permission for invalid user credentials', () => {
      service.authenticate('user@example.com', 'wrongpassword');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication failure with non-existent email
     * Verifies that unknown email results in guest permission
     */
    it('should set guest permission for non-existent email', () => {
      service.authenticate('unknown@example.com', 'anypassword');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with empty email
     * Verifies handling of edge case with empty email
     */
    it('should handle empty email gracefully', () => {
      service.authenticate('', 'admin');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with empty password
     * Verifies handling of edge case with empty password
     */
    it('should handle empty password gracefully', () => {
      service.authenticate('admin@example.com', '');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with both empty email and password
     * Verifies handling of edge case with both fields empty
     */
    it('should handle empty email and password gracefully', () => {
      service.authenticate('', '');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with null email
     * Verifies handling of edge case with null email
     */
    it('should handle null email gracefully', () => {
      service.authenticate(null as any, 'admin');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with null password
     * Verifies handling of edge case with null password
     */
    it('should handle null password gracefully', () => {
      service.authenticate('admin@example.com', null as any);
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with undefined values
     * Verifies handling of edge case with undefined parameters
     */
    it('should handle undefined email and password gracefully', () => {
      service.authenticate(undefined as any, undefined as any);
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test case sensitivity in email authentication
     * Verifies that email comparison is case sensitive
     */
    it('should be case sensitive for email authentication', () => {
      service.authenticate('ADMIN@EXAMPLE.COM', 'admin');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test case sensitivity in password authentication
     * Verifies that password comparison is case sensitive
     */
    it('should be case sensitive for password authentication', () => {
      service.authenticate('admin@example.com', 'ADMIN');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication with whitespace in credentials
     * Verifies that whitespace affects authentication
     */
    it('should handle whitespace in credentials', () => {
      service.authenticate(' admin@example.com ', ' admin ');
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test multiple authentication attempts
     * Verifies that permission changes with different credentials
     */
    it('should handle multiple authentication attempts', () => {
      // First attempt - admin
      service.authenticate('admin@example.com', 'admin');
      expect(service.activePermission()).toBe('admin');
      
      // Second attempt - user
      service.authenticate('user@example.com', 'user');
      expect(service.activePermission()).toBe('user');
      
      // Third attempt - invalid
      service.authenticate('invalid@example.com', 'invalid');
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication overwrites previous permission
     * Verifies that new authentication replaces old permission
     */
    it('should overwrite previous permission on new authentication', () => {
      // Start as admin
      service.authenticate('admin@example.com', 'admin');
      expect(service.activePermission()).toBe('admin');
      
      // Authenticate as user
      service.authenticate('user@example.com', 'user');
      expect(service.activePermission()).toBe('user');
      
      // Invalid authentication should reset to guest
      service.authenticate('wrong@example.com', 'wrong');
      expect(service.activePermission()).toBe('guest');
    });
  });

  describe('logout', () => {
    /**
     * Test logout functionality from admin permission
     * Verifies that logout resets permission to guest from admin
     */
    it('should logout from admin permission', () => {
      service.authenticate('admin@example.com', 'admin');
      expect(service.activePermission()).toBe('admin');
      
      service.logout();
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test logout functionality from user permission
     * Verifies that logout resets permission to guest from user
     */
    it('should logout from user permission', () => {
      service.authenticate('user@example.com', 'user');
      expect(service.activePermission()).toBe('user');
      
      service.logout();
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test logout when already guest
     * Verifies that logout from guest state maintains guest permission
     */
    it('should handle logout when already guest', () => {
      expect(service.activePermission()).toBe('guest');
      
      service.logout();
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test multiple logout calls
     * Verifies that multiple logout calls don't cause issues
     */
    it('should handle multiple logout calls', () => {
      service.authenticate('admin@example.com', 'admin');
      
      service.logout();
      expect(service.activePermission()).toBe('guest');
      
      service.logout();
      expect(service.activePermission()).toBe('guest');
      
      service.logout();
      expect(service.activePermission()).toBe('guest');
    });
  });

  describe('Integration Tests', () => {
    /**
     * Test complete authentication workflow
     * Verifies the entire login-logout cycle works correctly
     */
    it('should handle complete authentication workflow', () => {
      // Start as guest
      expect(service.activePermission()).toBe('guest');
      
      // Login as admin
      service.authenticate('admin@example.com', 'admin');
      expect(service.activePermission()).toBe('admin');
      
      // Logout
      service.logout();
      expect(service.activePermission()).toBe('guest');
      
      // Login as user
      service.authenticate('user@example.com', 'user');
      expect(service.activePermission()).toBe('user');
      
      // Logout again
      service.logout();
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test authentication state persistence during session
     * Verifies that permission state is maintained until changed
     */
    it('should maintain authentication state until changed', () => {
      service.authenticate('admin@example.com', 'admin');
      
      // Permission should persist
      expect(service.activePermission()).toBe('admin');
      expect(service.activePermission()).toBe('admin');
      expect(service.activePermission()).toBe('admin');
      
      // Change to user
      service.authenticate('user@example.com', 'user');
      expect(service.activePermission()).toBe('user');
      expect(service.activePermission()).toBe('user');
    });

    /**
     * Test permission transitions
     * Verifies all possible permission state transitions
     */
    it('should handle all permission transitions correctly', () => {
      const transitions = [
        { from: 'guest', to: 'admin', action: () => service.authenticate('admin@example.com', 'admin') },
        { from: 'admin', to: 'user', action: () => service.authenticate('user@example.com', 'user') },
        { from: 'user', to: 'guest', action: () => service.logout() },
        { from: 'guest', to: 'user', action: () => service.authenticate('user@example.com', 'user') },
        { from: 'user', to: 'admin', action: () => service.authenticate('admin@example.com', 'admin') },
        { from: 'admin', to: 'guest', action: () => service.logout() }
      ];

      transitions.forEach(transition => {
        transition.action();
        expect(service.activePermission()).toBe(transition.to);
      });
    });
  });

  describe('Signal Behavior', () => {
    /**
     * Test signal reactivity
     * Verifies that the signal updates correctly when permission changes
     */
    it('should update signal value when permission changes', () => {
      const initialValue = service.activePermission();
      expect(initialValue).toBe('guest');
      
      service.activePermission.set('admin');
      expect(service.activePermission()).toBe('admin');
      
      service.activePermission.set('user');
      expect(service.activePermission()).toBe('user');
    });

    /**
     * Test signal setter functionality
     * Verifies that the signal can be set directly
     */
    it('should allow direct signal manipulation', () => {
      service.activePermission.set('admin');
      expect(service.activePermission()).toBe('admin');
      
      service.activePermission.set('user');
      expect(service.activePermission()).toBe('user');
      
      service.activePermission.set('guest');
      expect(service.activePermission()).toBe('guest');
    });
  });

  describe('Data Validation and Edge Cases', () => {
    /**
     * Test service state consistency after multiple operations
     * Verifies that service maintains consistent state
     */
    it('should maintain consistent state after multiple operations', () => {
      const operations = [
        () => service.authenticate('admin@example.com', 'admin'),
        () => service.logout(),
        () => service.authenticate('user@example.com', 'user'),
        () => service.authenticate('invalid@example.com', 'invalid'),
        () => service.logout()
      ];
      
      operations.forEach(op => {
        op();
        const permission = service.activePermission();
        expect(['guest', 'user', 'admin']).toContain(permission);
      });
      
      expect(service.activePermission()).toBe('guest');
    });

    /**
     * Test service behavior with special characters in credentials
     * Verifies handling of special characters in email and password
     */
    it('should handle special characters in credentials', () => {
      const specialEmails = [
        'admin+test@example.com',
        'admin.test@example.com',
        'admin_test@example.com'
      ];
      
      const specialPasswords = [
        'admin!@#',
        'admin123',
        'admin-test'
      ];
      
      specialEmails.forEach(email => {
        service.authenticate(email, 'admin');
        expect(service.activePermission()).toBe('guest');
      });
      
      specialPasswords.forEach(password => {
        service.authenticate('admin@example.com', password);
        expect(service.activePermission()).toBe('guest');
      });
    });
  });
});
