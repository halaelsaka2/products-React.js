import axios from "axios";
const url = "http://localhost:3000/product";
export async function getAll(search, catId, sortBy, page) {
  var { data } = await axios
    .get(
      `${url}?search=${search}&categoryId=${catId}&sortBy=${sortBy}&page=${page}`
    )
    .catch((err) => console.log(err));

  return data;
}

export async function getById(id) {
  const { data } = await axios
    .get(`${url}/${id}`)
    .catch((err) => console.log(err.response.data));
  return data;
}
export async function addProduct(product) {
  const token = localStorage.getItem("token");
  console.log(token);
  const { data } = await axios.post(`${url}/addProduct`, product, {
    headers: {
      authorization: token,
    },
  });
  return data;
}
export async function updateProduct(id, product) {
  const token = localStorage.getItem("token");
  const response = await axios
    .patch(`${url}/${id}`, product, {
      headers: {
        authorization: token,
      },
    })
    .catch((err) => alert(err.response.data.message));
  return response ? response.data : null;
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const { data } = await axios.delete(`${url}/${id}`, {
    headers: {
      authorization: token,
    },
  });
  return data;
}
