import React, { use, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assetss } from "../assets/frontend_assets/assetss";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { filter } from "lodash";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = React.useState(true);
  const [FilterProduct, setFilterProduct] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState([]);
  const [sortValue, setSortValue] = React.useState("relevent");
  



  // Replace this in your component
  const SortProduct = (e) => {
    setSortValue(e.target.value); // Only update the sort value
  };

  const handleCategory = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    console.log(checked);
    if (checked) {
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleSubCategory = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    console.log(checked);
    if (checked) {
      setSubCategory((prev) => [...prev, value]);
    } else {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    }
  };
 useEffect(() => {
  // Start from a fresh copy of products
  let filteredProducts = products.map(product => ({ ...product }));

  // Apply search filter if needed
  if (search && showSearch) {
    filteredProducts = filteredProducts.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category and subCategory
  filteredProducts = filteredProducts.filter(product => {
    const isCategoryMatch = category.length ? category.includes(product.category) : true;
    const isSubCategoryMatch = subCategory.length ? subCategory.includes(product.subCategory) : true;
    return isCategoryMatch && isSubCategoryMatch;
  });

  // Sort based on sortValue
  if (sortValue === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts.sort((a, b) => a._id - 10 * b._id);
  }

  // Finally update state once with the fully filtered and sorted list
  setFilterProduct(filteredProducts);

}, [category, subCategory, products, search, showSearch, sortValue]);


  return (
    <div className="flex  flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className=" my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden  ${showFilter ? "rotate-90" : ""}`}
            src={assetss.dropdown_icon}
          />
        </p>

        {/* Category Options */}
        <div
          className={` border border-gray-300 pb-4 pl-4 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium mt-3">CATEGORIES</p>
          <div className="flex flex-col  text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="mt-0.9"
                value={"Men"}
                onChange={handleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="mt-0.9"
                value={"Women"}
                onChange={handleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="mt-0.9"
                value={"Kids"}
                onChange={handleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* SubCategary */}
        <div
          className={` border border-gray-300 pb-4 pl-4 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 mt-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="mt-0.9"
                value={"Topwear"}
                onChange={handleSubCategory}
              />{" "}
              TopWear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="mt-0.9"
                value={"Bottomwear"}
                onChange={handleSubCategory}
              />{" "}
              BottomWear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="mt-0.9"
                value={"Winterwear"}
                onChange={handleSubCategory}
              />{" "}
              WinterWear
            </p>
          </div>
        </div>
        {/*SubCategary END */}
      </div>
      {/*Right Side  Part Start*/}
      <div>
        <div className="flex flex-row gap-2 items-center justify-between">
          <Title
            className="text-2xl font-medium"
            text1={"ALL"}
            text2={"COLLECTION"}
          />
          <select
            className="border border-gray-300 rounded-md p-2 text-sm font-light mb-3 "
            onChange={SortProduct}
          >
            <option value="relevent"> Sort by : Relavent</option>
            <option value="low"> Sort by : Price Low to High</option>
            <option value="high"> Sort by : Price High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {FilterProduct.map((product, index) => (
            <ProductItem
              key={index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
