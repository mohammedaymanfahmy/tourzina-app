# Tourzina App - Atoms Usage Guide

This guide covers all the atomic components available in your Tourzina app. Atoms are the smallest, reusable UI components that form the building blocks of your application.

## Table of Contents
1. [AppButton](#appbutton)
2. [AppInput (Legacy)](#appinput-legacy)
3. [AppInput (New)](#appinput-new)
4. [AppDropDown](#appdropdown)
5. [IconButton](#iconbutton)
6. [AppPrice](#appprice)
7. [AppImage](#appimage)
8. [AppTitle](#apptitle)
9. [Skeleton](#skeleton)
10. [AssetByVariant](#assetbyvariant)
11. [IconByVariant](#iconbyvariant)

---

## AppButton

A versatile button component with multiple variants and sizes.

### Props
```
interface AppButtonProps {
  label: string;                    // Button text
  onPress?: () => void;            // Press handler
  size?: "sm" | "md" | "lg";      // Button size
  variant?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  color?: string;                  // Button color
  textColor?: string;              // Text color
  tonalOpacity?: number;           // Opacity for tonal variant (default: 0.12)
  fullWidth?: boolean;             // Full width button
  disabled?: boolean;              // Disabled state
  loading?: boolean;               // Loading state
  style?: StyleProp<ViewStyle>;    // Custom container style
  textStyle?: StyleProp<TextStyle>; // Custom text style
}
```

### Usage Examples

- Basic button
  ```
  import AppButton from './src/components/atoms/AppButton/AppButton';
  import colors from './src/colors/colors';

  <AppButton 
    label="Sign Up" 
    onPress={() => console.log('Pressed')} 
  />
  ```

- Different variants
  ```
  <AppButton 
    label="Contained" 
    variant="contained" 
    color={colors.primary} 
  />

  <AppButton 
    label="Outlined" 
    variant="outlined" 
    color={colors.primary} 
  />

  <AppButton 
    label="Text" 
    variant="text" 
    color={colors.primary} 
  />

  <AppButton 
    label="Elevated" 
    variant="elevated" 
    color={colors.primary} 
  />

  <AppButton 
    label="Tonal" 
    variant="contained-tonal" 
    color={colors.primary} 
    tonalOpacity={0.2} 
  />
  ```

- Different sizes
  ```
  <AppButton label="Small" size="sm" />
  <AppButton label="Medium" size="md" />
  <AppButton label="Large" size="lg" />
  ```

- States
  ```
  <AppButton label="Disabled" disabled={true} />
  <AppButton label="Loading" loading={true} />
  <AppButton label="Full Width" fullWidth={true} />
  ```

---

## AppInput (Legacy)

A simple input component with basic functionality.

### Props
```
interface InputProps {
  placeHolder: string;             // Placeholder text
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyBoardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
  size: 'small' | 'medium' | 'large';
  type?: 'search' | 'password' | 'default';
}
```

### Usage Examples

- Basic input
  ```
  import AppInput from './src/components/atoms/AppInput';

  <AppInput 
    placeHolder="Enter your email" 
    size="large" 
    type="default" 
  />
  ```

- Password input
  ```
  <AppInput 
    placeHolder="Enter your password" 
    size="large" 
    type="password" 
  />
  ```

- Search input
  ```
  <AppInput 
    placeHolder="Search..." 
    size="large" 
    type="search" 
  />
  ```

- Different sizes
  ```
  <AppInput placeHolder="Small" size="small" type="default" />
  <AppInput placeHolder="Medium" size="medium" type="default" />
  <AppInput placeHolder="Large" size="large" type="default" />
  ```

- With keyboard type
  ```
  <AppInput 
    placeHolder="Enter phone number" 
    size="large" 
    type="default" 
    keyBoardType="phone-pad" 
  />
  ```

---

## AppInput (New)

A more advanced input component with better styling and functionality.

### Props
```
interface BaseInputProps {
  variant?: "default" | "search" | "floating" | "minimal";
  size?: "sm" | "md" | "lg";
  state?: "default" | "error" | "success" | "disabled";
  bg?: keyof typeof colors;
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: object;
  inputStyle?: object;
}

interface TextInputProps extends BaseInputProps {
  inputType?: "text" | "email" | "password" | "search" | "numeric" | "phone";
  multiline?: boolean;
  numberOfLines?: number;
}
```

### Usage Examples

- Basic input
  ```
  import { AppInput } from './src/components/atoms/inputs';

  <AppInput 
    placeholder="Enter your email" 
    inputType="email" 
    size="lg" 
  />
  ```

- With label and helper text
  ```
  <AppInput 
    label="Email Address"
    placeholder="Enter your email" 
    inputType="email" 
    helperText="We'll never share your email"
  />
  ```

- Error state
  ```
  <AppInput 
    label="Password"
    placeholder="Enter your password" 
    inputType="password" 
    state="error"
    errorMessage="Password must be at least 8 characters"
  />
  ```

- Different variants
  ```
  <AppInput 
    placeholder="Search..." 
    inputType="search" 
    variant="search" 
  />

  <AppInput 
    placeholder="Minimal input" 
    variant="minimal" 
  />
  ```

- With custom background
  ```
  <AppInput 
    placeholder="Custom background" 
    bg="primary" 
  />
  ```

- Disabled state
  ```
  <AppInput 
    placeholder="Disabled input" 
    state="disabled" 
  />
  ```

- Multiline input
  ```
  <AppInput 
    placeholder="Enter your message" 
    multiline={true}
    numberOfLines={4}
  />
  ```

---

## AppDropDown

A dropdown component with search functionality.

### Props
```
interface DropdownProps {
  data: Item[];                    // Array of items
  isTextDropdown: boolean;         // Text-only dropdown style
  iconName: "search1" | "enviromento";
  iconColor: string;
}

interface Item {
  label: string;
  value: string;
}
```

### Usage Examples

- Basic dropdown
  ```
  import AppDropDown from './src/components/atoms/AppDropDown';
  import colors from './src/colors/colors';

  const countries = [
    { label: 'Egypt, Cairo', value: '1' },
    { label: 'USA, New York', value: '2' },
    { label: 'UK, London', value: '3' },
    { label: 'France, Paris', value: '4' },
  ];

  <AppDropDown 
    data={countries}
    isTextDropdown={false}
    iconName="enviromento"
    iconColor={colors.primary}
  />
  ```

- Text dropdown
  ```
  <AppDropDown 
    data={countries}
    isTextDropdown={true}
    iconName="search1"
    iconColor={colors.primary}
  />
  ```

---

## IconButton

A button component specifically designed for icons.

### Props
```
interface IconButtonProps {
  icon: React.ReactNode | ((p: { color: string; size: number }) => React.ReactNode);
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
  iconsize?: number;
  variant?: "icon" | "outlined" | "contained" | "elevated" | "contained-tonal";
  color?: string;
  tileColor?: string;
  pressColor?: string;
  iconColor?: string;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
  tonalOpacity?: number;
  tonalColor?: string;
  disabled?: boolean;
  loading?: boolean;
  iconpadding?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}
```

### Usage Examples

- Basic icon button
  ```
  import IconButton from './src/components/atoms/IconBtn/IconButton';
  import { Image } from 'react-native';
  import AntDesign from '@expo/vector-icons/AntDesign';

  <IconButton
    icon={({ color, size }) => (
      <AntDesign name="heart" size={size} color={color} />
    )}
    onPress={() => console.log('Liked')}
  />
  ```

- With custom icon
  ```
  <IconButton
    icon={({ color, size }) => (
      <Image
        source={require('./assets/google.png')}
        style={{ width: size, height: size }}
      />
    )}
    variant="contained"
    tileColor="white"
    pressColor="lightgrey"
  />
  ```

- Different variants
  ```
  <IconButton
    icon={({ color, size }) => <AntDesign name="star" size={size} color={color} />}
    variant="outlined"
    color={colors.primary}
  />

  <IconButton
    icon={({ color, size }) => <AntDesign name="plus" size={size} color={color} />}
    variant="elevated"
    tileColor={colors.primary}
  />
  ```

- Different sizes
  ```
  <IconButton
    icon={({ color, size }) => <AntDesign name="home" size={size} color={color} />}
    size="sm"
  />

  <IconButton
    icon={({ color, size }) => <AntDesign name="home" size={size} color={color} />}
    size="lg"
  />
  ```

---

## AppPrice

A component for displaying prices with currency formatting.

### Props
```
interface AppPriceProps {
  content: number;                 // Price amount
  size: number;                    // Font size
  perWhat: string;                 // Unit (e.g., "night", "trip", "person")
  isPrimaryColor: boolean;         // Use primary color for price
}
```

### Usage Examples

- Basic price
  ```
  import AppPrice from './src/components/atoms/Price/AppPrice';

  <AppPrice 
    content={100} 
    size={18} 
    perWhat="night" 
    isPrimaryColor={true} 
  />
  ```

- Different units
  ```
  <AppPrice content={500} size={20} perWhat="trip" isPrimaryColor={true} />
  <AppPrice content={50} size={16} perWhat="person" isPrimaryColor={false} />
  <AppPrice content={25} size={14} perWhat="hour" isPrimaryColor={true} />
  ```

---

## AppImage

A wrapper component for React Native Image with additional styling options.

### Props
```
interface AppImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<any>;
} & Omit<ImageProps, "source" | "style">;
```

### Usage Examples

- Basic image
  ```
  import AppImage from './src/components/atoms/Image/AppImage';

  <AppImage
    source={{ uri: 'https://example.com/image.png' }}
    style={{ width: 150, height: 150, borderRadius: 10 }}
  />
  ```

- Local image
  ```
  <AppImage
    source={require('./assets/logo.png')}
    style={{ width: 100, height: 100 }}
    containerStyle={{ alignItems: 'center', margin: 10 }}
  />
  ```

- With additional props
  ```
  <AppImage
    source={{ uri: 'https://example.com/image.png' }}
    style={{ width: 200, height: 200, borderRadius: 20 }}
    resizeMode="contain"
    containerStyle={{ padding: 10 }}
  />
  ```

---

## AppTitle

A text component for displaying titles, subtitles, and labels.

### Props
```
interface Props {
  type: string;                    // "title" | "subtitle" | "label"
  content: string;                 // Text content
}
```

### Usage Examples

- Title
  ```
  import AppTitle from './src/components/atoms/title/AppTitle';

  <AppTitle type="title" content="Welcome to Tourzina" />
  ```

- Subtitle
  ```
  <AppTitle type="subtitle" content="Discover amazing places" />
  ```

- Label
  ```
  <AppTitle type="label" content="Trip Details" />
  ```

---

## Skeleton

A loading skeleton component for better UX during data loading.

### Props
```
interface Properties {
  height?: DimensionValue;
  loading?: boolean;
  width?: DimensionValue;
} & ViewProps;
```

### Usage Examples

- Basic skeleton
  ```
  import Skeleton from './src/components/atoms/Skeleton/Skeleton';

  <Skeleton loading={true} height={100} width="100%" />
  ```

- Skeleton with content
  ```
  <Skeleton loading={isLoading} height={200}>
    <YourActualContent />
  </Skeleton>
  ```

- Different sizes
  ```
  <Skeleton loading={true} height={50} width="80%" />
  <Skeleton loading={true} height={150} width={300} />
  ```

---

## AssetByVariant

A component for displaying assets based on variants (requires theme context).

### Usage Examples

- Basic usage (requires theme context)
  ```
  import { AssetByVariant } from './src/components/atoms';

  <AssetByVariant 
    path="your-asset-path"
    width={100}
    height={100}
  />
  ```

---

## IconByVariant

A component for displaying icons based on variants (requires theme context).

### Usage Examples

- Basic usage (requires theme context)
  ```
  import { IconByVariant } from './src/components/atoms';

  <IconByVariant 
    path="search"
    width={24}
    height={24}
  />
  ```

---

## Import Examples

- Import individual components
  ```
  import AppButton from './src/components/atoms/AppButton/AppButton';
  import AppInput from './src/components/atoms/AppInput';
  import { AppInput as NewAppInput } from './src/components/atoms/inputs';
  import AppDropDown from './src/components/atoms/AppDropDown';
  import IconButton from './src/components/atoms/IconBtn/IconButton';
  import AppPrice from './src/components/atoms/Price/AppPrice';
  import AppImage from './src/components/atoms/Image/AppImage';
  import AppTitle from './src/components/atoms/title/AppTitle';
  import Skeleton from './src/components/atoms/Skeleton/Skeleton';
  ```

- Import from atoms index
  ```
  import { 
    AssetByVariant, 
    IconByVariant, 
    Skeleton 
  } from './src/components/atoms';
  ```

---

## Best Practices

- Consistent Sizing: Use the predefined size options (`sm`, `md`, `lg`) for consistency.
- Color Tokens: Use colors from `src/colors/colors.ts` for consistent theming.
- Accessibility: Always provide `accessibilityLabel` for interactive components.
- Loading States: Use the `loading` prop for better UX during async operations.
- Error Handling: Use the `state` prop in AppInput for error and success states.
- Responsive Design: Use `fullWidth` prop when components should span the full width.

This guide covers all the atomic components in your Tourzina app. Each component is designed to be reusable and consistent with your app's design system.