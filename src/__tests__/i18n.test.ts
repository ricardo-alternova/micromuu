// i18n configuration tests

describe('i18n Configuration', () => {
  const getInitialLanguage = (deviceLanguage: string): string => {
    if (deviceLanguage.startsWith('es')) {
      return 'es';
    }
    return 'en';
  };

  it('should return "en" for English device language', () => {
    expect(getInitialLanguage('en')).toBe('en');
    expect(getInitialLanguage('en-US')).toBe('en');
    expect(getInitialLanguage('en-GB')).toBe('en');
  });

  it('should return "es" for Spanish device language', () => {
    expect(getInitialLanguage('es')).toBe('es');
    expect(getInitialLanguage('es-ES')).toBe('es');
    expect(getInitialLanguage('es-MX')).toBe('es');
    expect(getInitialLanguage('es-AR')).toBe('es');
  });

  it('should fallback to "en" for unsupported languages', () => {
    expect(getInitialLanguage('fr')).toBe('en');
    expect(getInitialLanguage('de')).toBe('en');
    expect(getInitialLanguage('pt')).toBe('en');
    expect(getInitialLanguage('zh')).toBe('en');
    expect(getInitialLanguage('')).toBe('en');
  });
});

describe('Translation Keys', () => {
  const enTranslations = {
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      back: 'Back',
    },
    auth: {
      login: 'Sign In',
      register: 'Create Account',
      email: 'Email',
      sendMagicLink: 'Send Magic Link',
    },
    registration: {
      title: 'Create Your Account',
      name: 'First Name',
      lastName: 'Last Name',
      submit: 'Create Account',
    },
    welcome: {
      title: 'Welcome to Micromuu!',
      greeting: 'Howdy, {{name}}!',
    },
  };

  const esTranslations = {
    common: {
      loading: 'Cargando...',
      error: 'Ocurrio un error',
      back: 'Volver',
    },
    auth: {
      login: 'Iniciar Sesion',
      register: 'Crear Cuenta',
      email: 'Correo Electronico',
      sendMagicLink: 'Enviar Enlace Magico',
    },
    registration: {
      title: 'Crea Tu Cuenta',
      name: 'Nombre',
      lastName: 'Apellido',
      submit: 'Crear Cuenta',
    },
    welcome: {
      title: 'Bienvenido a Micromuu!',
      greeting: 'Hola, {{name}}!',
    },
  };

  it('should have matching keys in both languages', () => {
    const getKeys = (obj: any, prefix = ''): string[] => {
      return Object.keys(obj).reduce((keys: string[], key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          return [...keys, ...getKeys(obj[key], fullKey)];
        }
        return [...keys, fullKey];
      }, []);
    };

    const enKeys = getKeys(enTranslations).sort();
    const esKeys = getKeys(esTranslations).sort();

    expect(enKeys).toEqual(esKeys);
  });

  it('should have non-empty values for all translations', () => {
    const checkValues = (obj: any): boolean => {
      return Object.values(obj).every((value) => {
        if (typeof value === 'object' && value !== null) {
          return checkValues(value);
        }
        return typeof value === 'string' && value.length > 0;
      });
    };

    expect(checkValues(enTranslations)).toBe(true);
    expect(checkValues(esTranslations)).toBe(true);
  });

  it('should handle interpolation placeholders correctly', () => {
    const interpolate = (template: string, values: Record<string, string>): string => {
      return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || '');
    };

    expect(interpolate(enTranslations.welcome.greeting, { name: 'John' })).toBe('Howdy, John!');
    expect(interpolate(esTranslations.welcome.greeting, { name: 'Juan' })).toBe('Hola, Juan!');
  });
});
