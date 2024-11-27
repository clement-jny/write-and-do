import React from 'react';
import styles from '../styles/FAQ.module.css';

const FAQ: React.FC = () => {
    const faqList = [
        {
            question: "Comment créer une tâche ?",
            answer: "Pour créer une tâche, cliquez sur le bouton 'Créer une tâche' et remplissez les informations nécessaires."
        },
        {
            question: "Comment supprimer une tâche ?",
            answer: "Pour supprimer une tâche, cliquez sur l'icône de poubelle à côté de la tâche que vous souhaitez supprimer."
        },
        {
            question: "Comment éditer une tâche ?",
            answer: "Pour éditer une tâche, cliquez sur l'icône de crayon à côté de la tâche que vous souhaitez modifier."
        }
    ];

    return (
        <div className={styles.faqContainer}>
            <h1 className={styles.faqTitle}>FAQ</h1>
            <ul className={styles.faqList}>
                {faqList.map((faq, index) => (
                    <li key={index} className={styles.faqItem}>
                        <h2 className={styles.faqQuestion}>{faq.question}</h2>
                        <p className={styles.faqAnswer}>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;
