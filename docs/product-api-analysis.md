# Análise Detalhada da API de Produto

Todos os endpoints exigem o header HTTP obrigatório:

- `store-id`: Identificador da loja (UUID ou string, conforme implementação).

Os endpoints de criação e atualização (POST e PUT) exigem também o header:

- `Authorization`: Token JWT de autenticação.

---

## Endpoints

### 1. Listar Produtos

- **Método:** GET
- **Endpoint:** `/products`
- **Headers obrigatórios:**
  - `store-id`
- **Query Params:**
  - `page` (int): Número da página.
  - `size` (int): Tamanho da página.
- **Request Example:**
  ```
  GET /products?page=0&size=10
  store-id: 123e4567-e89b-12d3-a456-426614174000
  ```
- **Response Example:**
  ```json
  {
    "content": [
      {
        "id": "b1c2d3e4-f5a6-7890-1234-56789abcdef0",
        "externalId": "SKU-001",
        "mainImageUrl": "https://cdn.exemplo.com/produto1.jpg",
        "mainThumbnailUrl": "https://cdn.exemplo.com/produto1-thumb.jpg",
        "name": "Camiseta Básica",
        "description": "Camiseta 100% algodão",
        "brand": "Marca X",
        "observations": "Observação opcional",
        "category": "Roupas",
        "type": "SIMPLE",
        "basePrice": 59.9,
        "discountType": "PERCENTAGE",
        "discountValue": 10.0,
        "status": "ACTIVE",
        "totalInitialStock": 100,
        "totalCurrentStock": 80,
        "totalSoldQuantity": 20,
        "totalReservedQuantity": 0,
        "variants": [
          {
            "id": "v1c2d3e4-f5a6-7890-1234-56789abcdef0",
            "size": "M",
            "initialStock": 50,
            "stockAvailable": 40,
            "reservedQuantity": 0,
            "soldQuantity": 10
          }
        ],
        "images": [
          {
            "id": "i1c2d3e4-f5a6-7890-1234-56789abcdef0",
            "originalUrl": "https://cdn.exemplo.com/produto1.jpg",
            "thumbnailUrl": "https://cdn.exemplo.com/produto1-thumb.jpg",
            "position": 0,
            "isMain": true
          }
        ]
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "size": 10,
    "number": 0
  }
  ```

---

### 2. Buscar Produto por ID

- **Método:** GET
- **Endpoint:** `/products/{id}`
- **Headers obrigatórios:**
  - `store-id`
- **Path Params:**
  - `id` (UUID): ID do produto.
- **Request Example:**
  ```
  GET /products/b1c2d3e4-f5a6-7890-1234-56789abcdef0
  store-id: 123e4567-e89b-12d3-a456-426614174000
  ```
- **Response Example:** (igual ao objeto de produto acima)

---

### 3. Criar Produto

- **Método:** POST
- **Endpoint:** `/products`
- **Headers obrigatórios:**
  - `store-id`
  - `Authorization`
- **Body:** Objeto `ProductRequest` (JSON).
- **Request Example:**

  ```http
  POST /products
  store-id: 123e4567-e89b-12d3-a456-426614174000
  Authorization: Bearer <token>
  Content-Type: application/json

  {
    "name": "Camiseta Básica",
    "description": "Camiseta 100% algodão",
    "brand": "Marca X",
    "observations": "Observação opcional",
    "category": "Roupas",
    "type": "SIMPLE",
    "basePrice": 59.90,
    "discountType": "PERCENTAGE",
    "discountValue": 10.0,
    "status": "ACTIVE",
    "variants": [
      {
        "size": "M",
        "initialStock": 50
      }
    ]
  }
  ```

- **Response Example:** (igual ao objeto de produto acima, com os campos preenchidos)

---

### 4. Atualizar Produto

- **Método:** PUT
- **Endpoint:** `/products/{id}`
- **Headers obrigatórios:**
  - `store-id`
  - `Authorization`
- **Path Params:**
  - `id` (UUID): ID do produto.
- **Body:** Objeto `ProductRequest` (JSON).
- **Request Example:**

  ```http
  PUT /products/b1c2d3e4-f5a6-7890-1234-56789abcdef0
  store-id: 123e4567-e89b-12d3-a456-426614174000
  Authorization: Bearer <token>
  Content-Type: application/json

  {
    "mainImageUrl": "https://cdn.exemplo.com/produto1.jpg",
    "mainThumbnailUrl": "https://cdn.exemplo.com/produto1-thumb.jpg",
    "name": "Camiseta Básica Atualizada",
    "description": "Camiseta 100% algodão",
    "brand": "Marca X",
    "observations": "Observação opcional",
    "category": "Roupas",
    "type": "SIMPLE",
    "basePrice": 69.90,
    "discountType": "PERCENTAGE",
    "discountValue": 5.0,
    "status": "ACTIVE",
    "variants": [
      {
        "size": "M",
        "initialStock": 60
      }
    ]
  }
  ```

- **Response Example:** (igual ao objeto de produto acima, atualizado)

---

### 5. Remover Produto

- **Método:** DELETE
- **Endpoint:** `/products/{id}`
- **Headers obrigatórios:**
  - `store-id`
- **Path Params:**
  - `id` (UUID): ID do produto.
- **Request Example:**
  ```
  DELETE /products/b1c2d3e4-f5a6-7890-1234-56789abcdef0
  store-id: 123e4567-e89b-12d3-a456-426614174000
  ```
- **Response Example:**
  ```
  HTTP 204 No Content
  ```

---

### 6. Atualizar Imagem de Produto

- **Método:** PATCH
- **Endpoint:** `/products/{id}/images/{imageId}`
- **Headers obrigatórios:**
  - `store-id`
- **Path Params:**
  - `id` (UUID): ID do produto.
  - `imageId` (UUID): ID da imagem.
- **Body:** Multipart Form Data:
  - `file`: Arquivo da imagem (MultipartFile).
  - `metadata`: Objeto `ProductImageMetadataRequest` (JSON). Content-type application/json
- **Request Example:**

  ```
  PATCH /products/b1c2d3e4-f5a6-7890-1234-56789abcdef0/images/i1c2d3e4-f5a6-7890-1234-56789abcdef0
  store-id: 123e4567-e89b-12d3-a456-426614174000
  Content-Type: multipart/form-data

  file: <arquivo-imagem>
  data: {
    "position": 0,
    "isMain": true,
    "operationType": "UPDATE"
  }
  ```

- **Response Example:**
  ```json
  {
    "id": "i1c2d3e4-f5a6-7890-1234-56789abcdef0",
    "originalUrl": "https://cdn.exemplo.com/produto1.jpg",
    "thumbnailUrl": "https://cdn.exemplo.com/produto1-thumb.jpg",
    "position": 0,
    "isMain": true
  }
  ```

---

### 7. Remover Imagem de Produto

- **Método:** DELETE
- **Endpoint:** `/products/{id}/images/{imageId}`
- **Headers obrigatórios:**
  - `store-id`
- **Path Params:**
  - `id` (UUID): ID do produto.
  - `imageId` (UUID): ID da imagem.
- **Request Example:**
  ```
  DELETE /products/b1c2d3e4-f5a6-7890-1234-56789abcdef0/images/i1c2d3e4-f5a6-7890-1234-56789abcdef0
  store-id: 123e4567-e89b-12d3-a456-426614174000
  ```
- **Response Example:**
  ```
  HTTP 200 OK
  ```

---

### 8. Upload de Imagem para Produto

- **Método:** POST
- **Endpoint:** `/products/{id}/images`
- **Headers obrigatórios:**
  - `store-id`
- **Path Params:**
  - `id` (UUID): ID do produto.
- **Body:** Multipart Form Data:
  - `file`: Arquivo da imagem (MultipartFile).
  - `data`: Objeto `ProductImageMetadataRequest` (JSON). Content-type application/json
- **Request Example:**

  ```
  POST /products/b1c2d3e4-f5a6-7890-1234-56789abcdef0/images
  store-id: 123e4567-e89b-12d3-a456-426614174000
  Content-Type: multipart/form-data

  file: <arquivo-imagem>
  data: {
    "position": 1,
    "isMain": false,
    "operationType": "CREATE"
  }
  ```

- **Response Example:**
  ```json
  {
    "id": "i2c2d3e4-f5a6-7890-1234-56789abcdef0",
    "originalUrl": "https://cdn.exemplo.com/produto1-img2.jpg",
    "thumbnailUrl": "https://cdn.exemplo.com/produto1-img2-thumb.jpg",
    "position": 1,
    "isMain": false
  }
  ```

---

## Resumo dos Headers

| Endpoint                               | store-id | Authorization |
| -------------------------------------- | :------: | :-----------: |
| GET /products                          |   sim    |      não      |
| GET /products/{id}                     |   sim    |      não      |
| POST /products                         |   sim    |      sim      |
| PUT /products/{id}                     |   sim    |      sim      |
| DELETE /products/{id}                  |   sim    |      não      |
| PATCH /products/{id}/images/{imageId}  |   sim    |      não      |
| DELETE /products/{id}/images/{imageId} |   sim    |      não      |
| POST /products/{id}/images             |   sim    |      não      |

---

## Observações Gerais

- O header `store-id` é **sempre obrigatório** para todas as operações.
- O header `Authorization` é **obrigatório apenas** para criação e atualização de produtos (POST e PUT).
- Para endpoints de upload e atualização de imagens, o envio deve ser feito via `multipart/form-data`, contendo o arquivo e os metadados em JSON.
- Todos os endpoints retornam respostas padronizadas conforme os DTOs definidos no backend.

---
