import React, { useState } from "react";
import { colors } from "@precooked/utils";
import { DynamicIcon } from "@precooked/react-dynamic-icon";
import { Icon } from "@precooked/react-icon";
import { Touchable } from "@precooked/react-touchable";

// Función para convertir un color HEX a RGB
const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

// Función para calcular la luminancia de un color RGB y determinar si es oscuro
const isDarkColor = (color: string) => {
    const rgb = hexToRgb(color);
    if (!rgb) return false;

    const { r, g, b } = rgb;
    // Fórmula para calcular el brillo
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
};

const resolveIcon = (
    icon: string | undefined,
    paths?: any[],
    size?: number,
    color?: string
) => {
    if (icon) {
        return <Icon name={icon} size={size} color={color} />;
    } else if (paths) {
        return <DynamicIcon paths={paths} size={size} />;
    }
    return null;
};

interface FloatingActionButtonProps {
    onClick: () => void;
    color?: keyof typeof colors | string;
    borderRadius?: number;
    type?: "clear" | "outline" | "solid";
    disabled?: boolean;
    icon?: string;
    iconPaths?: string[];
    iconSize?: number;
    hasShadow?: boolean;
    style?: React.CSSProperties;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
    xs: { padding: "4px", iconSize: 12 },
    sm: { padding: "6px", iconSize: 16 },
    md: { padding: "10px", iconSize: 24 }, // Tamaño por defecto
    lg: { padding: "14px", iconSize: 32 },
    xl: { padding: "18px", iconSize: 40 },
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
    onClick,
    color = "primary",
    borderRadius = 999,
    type = "solid",
    disabled = false,
    icon,
    iconPaths,
    iconSize,
    hasShadow = true,
    style,
    size = "md",
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressStart = () => {
        if (!disabled) {
            setIsPressed(true);
        }
    };

    const handlePressEnd = () => {
        if (!disabled) {
            setIsPressed(false);
        }
    };

    const calculatedIconSize = sizeStyles[size].iconSize;
    const sizeStyle = sizeStyles[size];

    // Resuelve el color de fondo para el botón
    const resolvedColor = color in colors ? colors[color as keyof typeof colors] : color;

    // Determina el color del icono según el fondo
    const iconColor =
        type === "solid"
            ? isDarkColor(resolvedColor || "") // Si el color es oscuro, el icono será blanco; si no, usa colors.text
                ? "#fff"
                : colors.textShade
            : resolvedColor; // En los demás casos, el icono usará el color del texto

    const buttonStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: sizeStyles[size].padding,
        borderRadius: `${borderRadius}px`,
        border: type === "outline" ? `2px solid ${resolvedColor}` : "none",
        backgroundColor: type === "solid" ? resolvedColor : "transparent",
        boxShadow: hasShadow
            ? isPressed
                ? "none"
                : "0px 2px 5px rgba(0, 0, 0, 0.2)"
            : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease-in-out",
        opacity: disabled ? 0.6 : 1,
        position: "fixed", // Posición por defecto
        bottom: "20px", // Espaciado desde abajo
        right: "20px", // Espaciado desde la derecha
        width: `calc(${sizeStyle.iconSize}px + ${sizeStyle.padding} * 2)`, // Tamaño redondo basado en el tamaño del ícono y el padding
        height: `calc(${sizeStyle.iconSize}px + ${sizeStyle.padding} * 2)`, // Alto igual al ancho
        ...style,
    };

    return (
        <Touchable onClick={onClick} style={buttonStyle}>
            <button
                onMouseDown={handlePressStart} // Escritorio
                onMouseUp={handlePressEnd} // Escritorio
                onMouseLeave={handlePressEnd} // Escritorio
                onTouchStart={handlePressStart} // Móviles
                onTouchEnd={handlePressEnd} // Móviles
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "inherit",  // Inherit cursor from parent
                    outline: "none",   // Remove default button outline
                }}
                disabled={disabled}
            >
                {resolveIcon(
                    icon,
                    iconPaths,
                    iconSize ?? calculatedIconSize,
                    iconColor // El color del icono cambia dependiendo del fondo
                )}
            </button>
        </Touchable>
    );
};

export default FloatingActionButton;
