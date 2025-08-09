import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <span>Copyright &copy;</span> Ran&lsquo;s Finance Dashboard 2025
      </div>
      <div className={styles.footerContent}>
        <div>
          <a id="github-link" href="https://github.com/wwren/finance_dashboard" target="_blank" rel="noreferrer">
            <FaGithub size={20} />
            <span>GitHub</span>
          </a>
        </div>
        <div>
          <a id="linkedin-link" href="https://www.linkedin.com/in/ding-ran/" target="_blank" rel="noreferrer">
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
