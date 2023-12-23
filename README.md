# ACHEI

Aplicativo para procurar pessoas desaparecidas

# Requisitos Funcionais

- Fazer Registro de usuario [x]
- Fazer login de usuario [x]

- Deve ser possivel alterar a senha pelo email ou telefone [x]
- Deve ser possivel editar perfil de usuario logado [x]
- Deve ser possivel excluir perfil do usuario logado [x]
- Deve ser possivel visualizar perfil do usuario logado [x]

- Deve ser possivel listar todas publicacoes [x]
- Deve ser possivel listar publicacoes por provincias [x]
- Deve ser possivel listar publicacoes por proximidade (Ate 100m) --- PENDENTE!!!
- Deve ser possivel listar publicacoes por faixa etária []
- Deve ser possivel listar publicacoes por fotos (IA) -- PENDENTE!!!
- Fazer uma Publicacao de alguem desaparecido
- Fazer uma publicacao de alguem encontrado

- Deve ser possivel Comentar em uma publicacao
- Deve ser possivel gostar de uma publicacao
- Deve ser possivel excluir publicacao do usuario logado
- Deve ser possivel comentario do usuario logado
- Deve ser possivel Editar comentario do usuario logado
- Deve ser possivel tirar gosto da publicacao
- Um publicacao deve ter pelo menos uma foto
- Deve ser possivel buscar total de gostos da publicacao
- Deve ser possivel buscar total de commentarios da publicacao
- Deve ser possivel listar todos os comentarios da publicacao

## Regras de Negocios

- O usuario não pode se cadastrar com email ou telefone duplicado
- Não deve ser possivel gostar de uma publicao sem estar logado
- Não deve ser possivel comentar sem estar logado no sistema
- Não deve ser possivel publicar sem estar logado
- O tamanho das fotos deve ser menor ou igual a 2MB
- Apenas formato (JPG, PNG, JPEG) são suportados
- Só deve curtr uma publicaco uma unica vez

## R N funcionais

- A senha deve ser criptografada [x]
- A autenticao deve ser feita com JWT
- Deve listar 20 publicacoes por vez
