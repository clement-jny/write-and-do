import React from 'react';

const FAQ = () => {
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
        <div>
            <h1>FAQ</h1>
            <ul>
                {faqList.map((faq, index) => (
                    <li key={index}>
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FAQ;
