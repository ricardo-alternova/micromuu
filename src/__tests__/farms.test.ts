// Farm validation tests

describe('Farm Data Validation', () => {
  interface FarmData {
    name: string;
    location: string;
  }

  const validateFarmData = (data: FarmData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Farm name is required');
    } else if (data.name.length > 100) {
      errors.push('Farm name must be 100 characters or less');
    }

    if (data.location && data.location.length > 200) {
      errors.push('Location must be 200 characters or less');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  it('should validate correct farm data', () => {
    const result = validateFarmData({
      name: 'El Rancho Grande',
      location: 'Texas, USA',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should accept farm without location', () => {
    const result = validateFarmData({
      name: 'My Farm',
      location: '',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject empty name', () => {
    const result = validateFarmData({
      name: '',
      location: 'Texas',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Farm name is required');
  });

  it('should reject whitespace-only name', () => {
    const result = validateFarmData({
      name: '   ',
      location: 'Texas',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Farm name is required');
  });

  it('should reject name over 100 characters', () => {
    const result = validateFarmData({
      name: 'a'.repeat(101),
      location: 'Texas',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Farm name must be 100 characters or less');
  });

  it('should reject location over 200 characters', () => {
    const result = validateFarmData({
      name: 'My Farm',
      location: 'a'.repeat(201),
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Location must be 200 characters or less');
  });

  it('should accept name at exactly 100 characters', () => {
    const result = validateFarmData({
      name: 'a'.repeat(100),
      location: 'Texas',
    });

    expect(result.isValid).toBe(true);
  });

  it('should accept location at exactly 200 characters', () => {
    const result = validateFarmData({
      name: 'My Farm',
      location: 'a'.repeat(200),
    });

    expect(result.isValid).toBe(true);
  });

  it('should accept Spanish farm names', () => {
    const result = validateFarmData({
      name: 'Finca La Esperanza',
      location: 'Antioquia, Colombia',
    });

    expect(result.isValid).toBe(true);
  });

  it('should accept names with special characters', () => {
    const result = validateFarmData({
      name: "O'Reilly's Ranch",
      location: "County Cork, Ireland",
    });

    expect(result.isValid).toBe(true);
  });

  it('should accept names with numbers', () => {
    const result = validateFarmData({
      name: 'Ranch 47',
      location: 'Route 66, Arizona',
    });

    expect(result.isValid).toBe(true);
  });
});

describe('Farm Data Transformation', () => {
  const sanitizeFarmData = (data: { name: string; location: string }) => {
    return {
      name: data.name.trim(),
      location: data.location.trim(),
    };
  };

  it('should trim whitespace from all fields', () => {
    const result = sanitizeFarmData({
      name: '  My Farm  ',
      location: '  Texas, USA  ',
    });

    expect(result.name).toBe('My Farm');
    expect(result.location).toBe('Texas, USA');
  });

  it('should handle empty location gracefully', () => {
    const result = sanitizeFarmData({
      name: 'My Farm',
      location: '',
    });

    expect(result.name).toBe('My Farm');
    expect(result.location).toBe('');
  });

  it('should preserve casing', () => {
    const result = sanitizeFarmData({
      name: 'El Rancho GRANDE',
      location: 'San Antonio, TX',
    });

    expect(result.name).toBe('El Rancho GRANDE');
    expect(result.location).toBe('San Antonio, TX');
  });
});

describe('Farm Status', () => {
  type FarmStatus = 'active' | 'archived';

  const isValidStatus = (status: string): status is FarmStatus => {
    return status === 'active' || status === 'archived';
  };

  it('should accept active status', () => {
    expect(isValidStatus('active')).toBe(true);
  });

  it('should accept archived status', () => {
    expect(isValidStatus('archived')).toBe(true);
  });

  it('should reject invalid status', () => {
    expect(isValidStatus('deleted')).toBe(false);
    expect(isValidStatus('')).toBe(false);
    expect(isValidStatus('ACTIVE')).toBe(false);
  });
});
