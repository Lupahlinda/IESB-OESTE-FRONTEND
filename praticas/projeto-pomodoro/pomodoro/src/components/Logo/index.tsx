import { TimerIcon } from 'lucide-react'

import { RouterLink } from '../RouterLink'

import styles from './styles.module.css'

export function Logo() {
  return (
    <div className={styles.logo}>
      <RouterLink
        className={styles.logoLink}
        href="/"
      >
        <TimerIcon />

        <span>Pomodoro</span>
      </RouterLink>
    </div>
  )
}