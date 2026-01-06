// Profile validation tests

describe('Profile Data Validation', () => {
  interface ProfileData {
    name: string;
    lastName: string;
    email: string;
  }

  const validateProfileData = (data: ProfileData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Name is required');
    } else if (data.name.length > 100) {
      errors.push('Name must be 100 characters or less');
    }

    if (!data.lastName || data.lastName.trim().length === 0) {
      errors.push('Last name is required');
    } else if (data.lastName.length > 100) {
      errors.push('Last name must be 100 characters or less');
    }

    if (!data.email || data.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Email must be valid');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  it('should validate correct profile data', () => {
    const result = validateProfileData({
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject empty name', () => {
    const result = validateProfileData({
      name: '',
      lastName: 'Doe',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('should reject whitespace-only name', () => {
    const result = validateProfileData({
      name: '   ',
      lastName: 'Doe',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('should reject name over 100 characters', () => {
    const result = validateProfileData({
      name: 'a'.repeat(101),
      lastName: 'Doe',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Name must be 100 characters or less');
  });

  it('should reject empty lastName', () => {
    const result = validateProfileData({
      name: 'John',
      lastName: '',
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Last name is required');
  });

  it('should reject lastName over 100 characters', () => {
    const result = validateProfileData({
      name: 'John',
      lastName: 'a'.repeat(101),
      email: 'john@example.com',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Last name must be 100 characters or less');
  });

  it('should reject empty email', () => {
    const result = validateProfileData({
      name: 'John',
      lastName: 'Doe',
      email: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Email is required');
  });

  it('should reject invalid email format', () => {
    const result = validateProfileData({
      name: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Email must be valid');
  });

  it('should collect multiple errors', () => {
    const result = validateProfileData({
      name: '',
      lastName: '',
      email: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(3);
    expect(result.errors).toContain('Name is required');
    expect(result.errors).toContain('Last name is required');
    expect(result.errors).toContain('Email is required');
  });

  it('should accept valid Spanish names', () => {
    const result = validateProfileData({
      name: 'Jose',
      lastName: 'Garcia',
      email: 'jose@ejemplo.com',
    });

    expect(result.isValid).toBe(true);
  });

  it('should accept names with accents and special characters', () => {
    const result = validateProfileData({
      name: "Maria Jose",
      lastName: "O'Brien-Garcia",
      email: 'maria@example.com',
    });

    expect(result.isValid).toBe(true);
  });
});

describe('Profile Data Transformation', () => {
  const sanitizeProfileData = (data: { name: string; lastName: string; email: string }) => {
    return {
      name: data.name.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
    };
  };

  it('should trim whitespace from all fields', () => {
    const result = sanitizeProfileData({
      name: '  John  ',
      lastName: '  Doe  ',
      email: '  John@Example.COM  ',
    });

    expect(result.name).toBe('John');
    expect(result.lastName).toBe('Doe');
    expect(result.email).toBe('john@example.com');
  });

  it('should lowercase email', () => {
    const result = sanitizeProfileData({
      name: 'John',
      lastName: 'Doe',
      email: 'JOHN@EXAMPLE.COM',
    });

    expect(result.email).toBe('john@example.com');
  });

  it('should preserve name casing', () => {
    const result = sanitizeProfileData({
      name: 'Mary Jane',
      lastName: 'McDonald',
      email: 'mary@example.com',
    });

    expect(result.name).toBe('Mary Jane');
    expect(result.lastName).toBe('McDonald');
  });
});
