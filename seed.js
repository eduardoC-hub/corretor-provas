function popularCategoria(db, categoria) {
    db.insert(categoria).values([
        { nome: 'Matemática' },
        { nome: 'Português' },
        { nome: 'Geografia' },
        { nome: 'História' },
        { nome: 'Ciências' }
    ]);
}