import "../style/item-view.scss";
import React, { useState } from "react";
import { TextField, NumberField, SelectField } from '../components/formField.js';
import Modal from '../components/modal.js';
import { Link } from "react-router-dom";
import { updateArticle } from "../services/articleServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModifyArticleView(props) {

  const { data, removeItemView, categories } = props;


  // States
  const [description, setDescription] = useState(data.description);
  const [sold_price, setSoldPrice] = useState(data.sold_price);
  const [production_price, setProductionPrice] = useState(data.production_cost);
  const [family, setFamily] = useState(data.family);
  const [stock, setStock] = useState(data.stock);
  const [quantity_min, setQuantityMin] = useState(data.quantity_min);
  const [quantity_provided, setQuantityProvided] = useState(data.quantity_provided);
  const [tax_id, setTaxId] = useState(data.tax_id);

  // Delete article
  function deleteArticle() {
    // TODO : Delete article

    removeItemView();

    const deleteSuccess = () => toast("Article deleted !", { type: "success" });

    deleteSuccess();
  }

  // Modify article
  function modifyArticle() {

    // Build article object
    const article = {
      id: data.id,
      description: description,
      sold_price: sold_price,
      production_price: production_price,
      family: family,
      stock: stock,
      quantity_min: quantity_min,
      quantity_provided: quantity_provided,
      tax_id: tax_id
    };

    const errors = [];

    // Errors handling

    // Description
    if (article.description === "") {
      errors.push("Description can't be empty");
    }

    if (article.description.length > 50) {
      errors.push("Description can't be longer than 50 characters");
    }

    // Sold price
    if (article.sold_price === "") {
      errors.push("Sold price can't be empty");
    }

    if (article.sold_price < 0) {
      errors.push("Sold price can't be negative");
    }

    // Production price
    if (article.production_price === "") {
      errors.push("Production price can't be empty");
    }

    if (article.production_price < 0) {
      errors.push("Production price can't be negative");
    }

    // Stock
    if (article.stock === "") {
      errors.push("Stock can't be empty");
    }

    if (article.stock < 0) {
      errors.push("Stock can't be negative");
    }

    // Quantity min
    if (article.quantity_min === "") {
      errors.push("Quantity min can't be empty");
    }

    if (article.quantity_min < 0) {
      errors.push("Quantity min can't be negative");
    }

    // Quantity provided
    if (article.quantity_provided === "") {
      errors.push("Quantity provided can't be empty");
    }

    if (article.quantity_provided < 0) {
      errors.push("Quantity provided can't be negative");
    }

    // TODO : Make the errors more precise
    if (errors.length > 0) {
      const error = () => toast(errors.join("\n"), { type: "error" });
      error();
    } else {
      const updateSuccess = () => toast("Article successfully updated !", { type: "success" });
      updateArticle(article)
      removeItemView();
      updateSuccess();
    }
  }

  return (
    <Modal>
      <div id="modify-view">
        <h1 id="section-title">Modify article</h1>

        <div
          id="black-back"
          onClick={() => {
            removeItemView();
          }}
        />

        <div style={{ width: "80%" }}>

          <TextField
            for="description"
            label="Description"
            value={data.description}
            tooltip="Can't be empty"
            onChange={(e) => { setDescription(e.target.value) }}
          />

          <div className="field-line">
            <NumberField
              for="sold_price"
              label="Sold price"
              value={data.sold_price}
              tooltip={<>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
              min="0"
              step="0.01"
              max="9999999"
              regex={/\d+\.\d{2}/}
              onChange={(e) => { setSoldPrice(e.target.value) }}
            />

            <NumberField
              for="production_price"
              label="Production price"
              value={data.production_cost}
              tooltip={<>Must be a positive number with two decimals <b> Example: </b> 12.34</>}
              min="0"
              step="0.01"
              max="9999999"
              regex={/\d+\.\d{2}/}
              onChange={(e) => { setProductionPrice(e.target.value) }}
            />

            <SelectField
              for="tax_id"
              label="Tax"
              value={data.tax_id}
              options={[{ id: 1, name: "TVA 20%" }, { id: 2, name: "TVA 10%" }]}
              tooltip={<>To add a tax, go to the <Link className="link" to='/taxes'>Tax Page</Link></>}
              onChange={(e) => { setTaxId(e.target.value) }}
            />
          </div>

          <div className="field-line">

            <NumberField
              for="stock"
              label="Quantity in stock"
              value={data.stock}
              tooltip="Must be a positive or null integer"
              min="0"
              step="1"
              regex={/^\+?(0|[1-9]\d*)$/}
              onChange={(e) => { setStock(e.target.value) }}
            />

            <NumberField
              for="quantity_min"
              label="Quantity minimum"
              value={data.quantity_min}
              tooltip="Must be a positive or null integer"
              min="0"
              step="1"
              regex={/^\+?(0|[1-9]\d*)$/}
              onChange={(e) => { setQuantityMin(e.target.value) }}
            />

            <NumberField
              for="quantity_provided"
              label="Quantity provided"
              value={data.quantity_provided}
              tooltip="Must be a positive or null integer"
              min="0"
              step="1"
              regex={/^\+?(0|[1-9]\d*)$/}
              onChange={(e) => { setQuantityProvided(e.target.value) }}
            />
          </div>

          <div className="field-line">
            <SelectField
              for="family"
              label="Family"
              value={data.family}
              options={categories}
              tooltip="To add a family, go to the Family page"
              onChange={(e) => { setFamily(e.target.value) }}
            />
          </div>
        </div>

        <div className="modify-buttons-list">
          <button className="modify-button save-button" onClick={() => {
            if (window.confirm("Are you sure you want to save changes ?")) {
              modifyArticle()
            }
          }}>Save changes</button>

          <button className="modify-button delete-button" onClick={() => {
            if (window.confirm("Are you sure you want to delete this article ?")) {
              deleteArticle()
            }
          }}>Delete article</button>
        </div>
      </div>
    </Modal>
  );
}
