
# FloatingActionButton

A versatile floating action button component for React, designed with customization and flexibility in mind. It supports multiple styles, shadows, icon integration, and responsive sizing.

![Precooked Logo](https://precookedcode.com/assets/logos/logo-horizontal-dark.svg)

## Installation

```bash
npm install @precooked/react-floating-action-button
```

## Usage Example

```tsx
import React from "react";
import FloatingActionButton from "@precooked/react-floating-action-button";

const App = () => {
    const handleClick = () => {
        console.log("Floating Action Button Clicked!");
    };

    return (
        <div>
            <FloatingActionButton
                onClick={handleClick}
                color="primary"
                icon="plus"
                type="solid"
                size="md"
                hasShadow={true}
            />
        </div>
    );
};

export default App;
```

## Props

| Prop          | Type                                    | Description                                                                              | Default    |
|---------------|-----------------------------------------|------------------------------------------------------------------------------------------|------------|
| `onClick`     | `() => void`                           | Callback function triggered when the button is clicked.                                  | `undefined`|
| `color`       | `keyof colors \| string`               | Defines the button color. Accepts predefined color keys or custom hex codes.             | `"primary"`|
| `borderRadius`| `number`                               | Sets the border radius of the button.                                                   | `999`      |
| `type`        | `"clear" \| "outline" \| "solid"`      | Defines the button style.                                                               | `"solid"`  |
| `disabled`    | `boolean`                              | Disables the button if set to true.                                                     | `false`    |
| `icon`        | `string`                               | The name of the icon to display.                                                        | `undefined`|
| `iconPaths`   | `string[]`                             | Custom SVG paths for the icon.                                                          | `undefined`|
| `iconSize`    | `number`                               | Size of the icon in pixels.                                                             | Calculated |
| `hasShadow`   | `boolean`                              | Determines whether the button has a shadow.                                             | `true`     |
| `style`       | `React.CSSProperties`                  | Additional custom styles for the button.                                                | `{}`       |
| `size`        | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | Sets the size of the button, adjusting padding and icon size.                            | `"md"`     |

## Features

- Supports multiple styles: `solid`, `outline`, and `clear`.
- Customizable shadow and border radius.
- Dynamic icon support, including custom SVG paths.
- Responsive sizing options (`xs`, `sm`, `md`, `lg`, `xl`).
- Lightweight and easy to integrate.

---

## Contributing

Feel free to submit issues or feature requests in the [GitHub repository](https://github.com/precookedcode/react-floating-action-button).

## License

MIT
