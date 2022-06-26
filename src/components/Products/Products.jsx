import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext/ProductsState";
import { Link } from 'react-router-dom'
import { Button, Modal } from 'antd';


import './Products.scss'
import Reviews from "../Reviews/Reviews";
import { ReviewsContext } from "../../context/ReviewsContext/ReviewsState";




const Products = () => {
  const { products, getProducts,favs, addCart, addFavs,deleteProduct,filterProduct,filterProductName} = useContext(ProductsContext);
  const { reviews} = useContext(ReviewsContext)

  const token = JSON.parse(localStorage.getItem('token'))
  const role = JSON.parse(localStorage.getItem('role'))

  console.log("ESTO ES",reviews)
  useEffect(() => {
    getProducts();
  }, []);

  const [valor, setValor] = useState(40)

  const handleChange = (event) => {
    setValor(event.target.value)
    filterProduct(valor)
  }

  const [name, setName] = useState('')


  const handleInputChange = (event) => {
    setName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    filterProductName(name)
    console.log(name)
    getProducts()
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (products.length <= 0) {
    return <span>Cargando...</span>;
  }  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }; 
  
  const listProducts=products.map((product,i)=>{return(
    
  <div className='product' key={i}>
  <h2>{product.name}</h2> 
 
  <div className='content'>
    <div className="text">
  <span>Descripción: {product.description}</span><br/>
  <span>Precio: {product.price}€</span><br/>
  <span>Stock: {product.stock}</span><br/></div>
  {product.img ?<img src={"http://localhost:8080/images/products/"+product.img}/> : <img src="http://localhost:8080/images/products/int.jpg"/> }
  </div>
 
  <div className="button">
  {token && role==='user'? <> <button onClick={() => addCart(product)}>Añadir a carrito</button>
  {favs.map((f)=>f.id).includes(product.id) ? null : <button onClick={() => addFavs(product)}>Añadir favorito</button>} 
  <div className="reviews">
  <Button type="primary" onClick={showModal}>
       Reviews
      </Button>
      <Modal title="Reviews" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       <Reviews/>
      </Modal>
      </div>
  </>
  : null}
  { role==='SuperAdmin' ? <><button><Link to={'/products/id/' + product.id}>Editar producto</Link> </button>
    <button onClick={() => deleteProduct(product.id)}>Borrar producto</button></> :null}</div></div>
  )}
  )

  return (
    <>
        <div className='title'> 
        <div className="range">
        <span className="inputText">Rango de precio: {valor} €</span><br/>
        <input
          type="range"
          className="rangeInput"
          size="5rem"
          min="4" 
          max="40" 
          onChange={handleChange} 
          />
        </div>

        <span className="textTitle">Productos</span>

        <div className="search">
        <form action="" onSubmit={handleSubmit}>
        <input
          type="text" 
         className="inputSearch"
         placeholder="Nombre producto..."
          onChange={handleInputChange}
          />
          <button className='btnsearch' type="submit">Buscar</button>
        </form>
        </div>
      
      </div>
        <div className='containerProducts'>
          {listProducts}
          {products.name} 
        </div>
    </>
  );
};

export default Products;

