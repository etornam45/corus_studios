import clsx from "clsx";
import React, { type ComponentProps } from "react";

const Button = React.forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ className, children, ...props }, ref) => {
		return (
			<button
				type="button"
				className={clsx(
					"px-2 py-1 rounded-sm font-mono inline-flex items-center gap-2 disabled:opacity-70 bg-blue-500 text-white border-b-3 cursor-pointer border-blue-8",
					className,
				)}
				{...props}
				ref={ref}
			>
				{children}
			</button>
		);
	},
);

export { Button };
