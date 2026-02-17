import styles from './Button.module.css';

interface ButtonProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, onClick, variant = 'primary', disabled }: ButtonProps) => {
  const variantClass = styles[`btn-${variant}`] || styles['btn-primary'];
  return (
    <button className={`${styles.btn} ${variantClass}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
