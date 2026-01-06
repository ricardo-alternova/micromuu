// Validation utility tests

describe('Email Validation', () => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  it('should return true for valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co')).toBe(true);
    expect(validateEmail('user+tag@example.org')).toBe(true);
    expect(validateEmail('a@b.co')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('invalid@')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('user@domain')).toBe(false);
    expect(validateEmail('user name@domain.com')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(validateEmail('   ')).toBe(false);
    expect(validateEmail('test @example.com')).toBe(false);
    expect(validateEmail('test@ example.com')).toBe(false);
  });
});

describe('Form Validation', () => {
  const validateName = (name: string): boolean => {
    return name.trim().length > 0;
  };

  const validateForm = (data: { name: string; lastName: string; email: string }) => {
    const errors: { name?: string; lastName?: string; email?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  it('should validate required name field', () => {
    expect(validateName('John')).toBe(true);
    expect(validateName('')).toBe(false);
    expect(validateName('   ')).toBe(false);
  });

  it('should return no errors for valid form data', () => {
    const result = validateForm({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should return errors for missing fields', () => {
    const result = validateForm({
      name: '',
      lastName: '',
      email: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Name is required');
    expect(result.errors.lastName).toBe('Last name is required');
    expect(result.errors.email).toBe('Email is required');
  });

  it('should return error for invalid email format', () => {
    const result = validateForm({
      name: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Invalid email');
  });

  it('should trim whitespace from fields', () => {
    const result = validateForm({
      name: '  John  ',
      lastName: '  Doe  ',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(true);
  });
});
