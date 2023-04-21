import styles from './Style-homepage.module.css'

function Homepage() {
    return(
    <>
    <div className={styles.general}>
        {/* l.bar = lateral bar (nombre de referencia) */}
        <aside className={styles.lBar}>
            {"Aguacate"}
        </aside >
        {/* s.bar = superior bar (nombre de referencia) */}
        <nav className={styles.sBar}>
            {"Aguacate"}
        </nav>
        {/* content = contenido (nombre de referencia para el lugar que almacena las cajas) */}
        <main className={styles.content}>
            {"Aguacate"}
        </main>
        {/* f.page = footer page (nombre de referencia para el pie de pagina) */}
        <footer className={styles.fPage}>
            {"Aguacate"}
        </footer>
    </div>
    </>
    )
}

export default Homepage