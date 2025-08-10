import styles from "./page.module.css";
import { StockTable } from "@/components/StockTable/StockTable";
import stockData from "@/app/data/stockData.json";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>S&P 500</h1>
        </div>
        <StockTable data={stockData} />
      </main>
    </div>
  );
}
