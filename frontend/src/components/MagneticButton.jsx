import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', onClick, type = 'button', disabled = false, ...props }) {
  return (
    <motion.button
      type={type}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      whileHover={
        disabled
          ? undefined
          : {
              y: -2,
              scale: 1.02,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }
      }
      whileTap={disabled ? undefined : { scale: 0.96 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}
