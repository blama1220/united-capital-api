import jwt from "jsonwebtoken";
import Joi from 'joi';
import { users, products, comments } from "./data.js";

class Validate {
  static generarToken(username, password) {
    // Token Privado para la firma
    const privateKey = "united_capital";
    // Se busca el user en el users.js validando tanto el username como el password
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    // Si el usuario no existe se lanza un error
    if (!user) {
      throw new Error("Nombre de usuario o contraseña incorrectos");
    }

    // Return del token utilizando la informacion del usuario y el token privado
    return jwt.sign(user, privateKey);
  }

  // Metodo toma la lista de productos del data.js y filtra los productos disponibles de no tener categoria y/o precio minimo
  // TODO: Se puede optimizar
  static availableProducts(category, minPrice) {
    try {
      if (!category && !minPrice)
        return products.filter((product) => product.available);

      let filteredProducts = products.filter((product) => {
        if (category && minPrice) {
          return (
            product.category === category &&
            product.price >= minPrice &&
            product.available
          );
        } else if (category) {
          return product.category === category && product.available;
        } else if (minPrice) {
          return product.price >= minPrice && product.available;
        } else {
          return product.available;
        }
      });
      return filteredProducts;
    } catch (err) {
      throw new Error("Error en la busqueda");
    }
  }

  // Crea un nuevo registro en el arreglo de comentarios y al length del mismo se le suma 1 para no tener id repetidos
  // TODO: Agregar Validacion de texto
  static createComment(text) {
    try {
      const newComment = {
        id: comments.length + 1,
        text,
      };
      comments.push(newComment);
      return newComment;
    } catch (err) {
      throw new Error("Error al crear el comentario");
    }
  }
}

export default Validate;
