import React from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/Input";
import OutlinedButtonSmall from "./buttons/OutlinedButtonSmall";
import { Product } from "@/types/product";
import FilledButton from "./buttons/FilledButton";
import OutlinedButton from "./buttons/OutlinedButton";
import Text from "./Text";
import Checkbox from "./Checkbox";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";


type Menu = "Add Products" | "All Products" | "Popular Products" | "Collections" | "Product Types" | "Product Tags" | "Vendors" | "Selected Products";
type SubMenu = { title: string; params: URLSearchParams } | null;
type ListMenuItem = { _id: string; title: string };

export default function BrowseProductsDialog({ defaultQuery = "", setProducts }: { defaultQuery?: string, productIds: string[], setProducts: (products: Product[]) => void }) {

  const [open, setOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<Menu>("Add Products");
  const [activeSubMenu, setActiveSubMenu] = React.useState<SubMenu>(null);
  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([]);

  function ActiveMenu() {

    if (activeSubMenu !== null) {
      switch (activeMenu) {
        case "Collections":
          return <CollectionMenu subMenu={activeSubMenu} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
        case "Product Types":
          return <ProductTypeMenu subMenu={activeSubMenu} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
        case "Product Tags":
          return <ProductTagMenu subMenu={activeSubMenu} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
        case "Vendors":
          return <VendorMenu subMenu={activeSubMenu} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
        default:
          throw new Error("Invalid activeSubMenu")
      }
    }

    switch (activeMenu) {
      case "Add Products":
        return <AddProductsMenu defaultQuery={defaultQuery} setSelectedMenu={setActiveMenu} />;
      case "All Products":
        return <AllProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />;
      case "Popular Products":
        return <PopularProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />;
      case "Collections":
        return <CollectionsMenu setSubMenu={setActiveSubMenu} />;
      case "Product Types":
        return <ProductTypesMenu setSubMenu={setActiveSubMenu} />;
      case "Product Tags":
        return <ProductTagsMenu setSubMenu={setActiveSubMenu} />;
      case "Vendors":
        return <VendorsMenu setSubMenu={setActiveSubMenu} />;
      case "Selected Products":
        return <SelectedProductsMenu setActiveMenu={setActiveMenu} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />;
    }
  }

  function Title() {
    if (activeMenu === "Add Products") {
      return activeMenu;
    }

    function handleBack() {
      if (activeSubMenu !== null) {
        setActiveSubMenu(null)
      } else {
        setActiveMenu("Add Products")
      }
    }

    return (
      <div className="flex gap-2 items-center">
        <button onClick={handleBack}>
          <IoIosArrowRoundBack size={24} className="text-gray-300 hover:text-gray-800 transition-all" />
        </button>
        {activeSubMenu !== null ? activeSubMenu.title : activeMenu}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <OutlinedButtonSmall onClick={() => { }}>Browse</OutlinedButtonSmall>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle><Title /></DialogTitle>
        </DialogHeader>

        <ActiveMenu />

        <DialogFooter className="flex whitespace-nowrap items-center justify-between">

          {
            selectedProducts.length === 0 || activeMenu === "Selected Products" ? (
              <Text>{selectedProducts.length} variants selected</Text>
            ) : (
              <OutlinedButton onClick={() => setActiveMenu("Selected Products")}>{selectedProducts.length} variants selected</OutlinedButton>
            )
          }

          <div className="w-full" />

          <div className="flex gap-2">
            <OutlinedButton onClick={() => setOpen(false)}>Cancel</OutlinedButton>
            <FilledButton onClick={() => {
              setProducts(selectedProducts)
              setOpen(false)
            }}>Add</FilledButton>
          </div>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddProductsMenu({ defaultQuery, setSelectedMenu }: { defaultQuery: string; setSelectedMenu: React.Dispatch<React.SetStateAction<Menu>> }) {

  const [query, setQuery] = React.useState(defaultQuery);
  const menus: Menu[] = ["All Products", "Popular Products", "Collections", "Product Types", "Product Tags", "Vendors"];

  function ListItem({ menu }: { menu: Menu }) {
    return (
      <button className="flex w-full justify-between px-4 py-3 border-t border-gray-200 hover:bg-gray-100 bg-white transition-all" onClick={() => setSelectedMenu(menu)}>
        <Text className="text-gray-800">{menu}</Text>
        <IoIosArrowForward size={14} className="text-neutral-500" />
      </button>
    )
  }

  return (

    <div className=" flex flex-col gap-4 my-4">

      <div className="px-4 w-full">
        <Input id="search-query" value={query} icon={<AiOutlineSearch />} placeholder="Search products" onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="w-full">
        {
          menus.map(m => <ListItem key={m} menu={m} />)
        }
      </div>

    </div>
  )
}

function AllProductsMenu({ selectedProducts, setSelectedProducts }: { selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
  return (
    <ProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} load={async () => {
      const res = await axios.get("/api/products");
      return res.data;
    }} />
  )
}

function PopularProductsMenu({ selectedProducts, setSelectedProducts }: { selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
  return (
    <ProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} load={async () => {
      const res = await axios.get("/api/products/popular");
      return res.data;
    }} />
  )
}

function CollectionsMenu({ setSubMenu }: { setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>; }) {
  return (
    <Listmenu setSubMenu={setSubMenu} load={async () => {
      const { data } = await axios.get("/api/products/collections");
      return data;
    }} paramsIdName="collection" />
  )
}

function CollectionMenu({ subMenu, selectedProducts, setSelectedProducts }: { subMenu: SubMenu; selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>; }) {
  return (
    <ProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} load={async () => {
      const res = await axios.get(`/api/products?${subMenu!.params.toString()}`);
      return res.data;
    }} />
  )
}

function ProductTypesMenu({ setSubMenu }: { setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>; }) {
  return (
    <Listmenu setSubMenu={setSubMenu} load={async () => {
      const res = await axios.get("/api/products/types");
      const data: { _id: string }[] = res.data;
      return data.map(e => ({ _id: e._id, title: e._id }));
    }} paramsIdName="type" />
  )
}

function ProductTypeMenu({ subMenu, selectedProducts, setSelectedProducts }: { subMenu: SubMenu; selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>; }) {
  return (
    <ProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} load={async () => {
      const res = await axios.get(`/api/products?${subMenu!.params.toString()}`);
      return res.data;
    }} />
  )
}


function ProductTagsMenu({ setSubMenu }: { setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>; }) {
  return (
    <Listmenu setSubMenu={setSubMenu} load={async () => {
      const res = await axios.get("/api/products/tags");
      const data: { _id: string }[] = res.data;
      return data.map(e => ({ _id: e._id, title: e._id }));
    }} paramsIdName="tags" />
  )
}

function ProductTagMenu({ subMenu, selectedProducts, setSelectedProducts }: { subMenu: SubMenu; selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>; }) {
  console.log(subMenu!.params.toString())
  return (
    <ProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} load={async () => {
      const res = await axios.get(`/api/products?${subMenu!.params.toString()}`);
      return res.data;
    }} />
  )
}

function VendorsMenu({ setSubMenu }: { setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>; }) {
  return (
    <Listmenu setSubMenu={setSubMenu} load={async () => {
      const res = await axios.get("/api/vendors");
      const data: { _id: string }[] = res.data;
      return data.map(e => ({ _id: e._id, title: e._id }));
    }} paramsIdName="tags" />
  )
}

function VendorMenu({ subMenu, selectedProducts, setSelectedProducts }: { subMenu: SubMenu; selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>; }) {
  console.log(subMenu!.params.toString())
  return (
    <ProductsMenu selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} load={async () => {
      const res = await axios.get(`/api/products?${subMenu!.params.toString()}`);
      return res.data;
    }} />
  )
}


function SelectedProductsMenu({ setActiveMenu, selectedProducts, setSelectedProducts }: { setActiveMenu: React.Dispatch<React.SetStateAction<Menu>>; selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {

  React.useEffect(() => {
    if (selectedProducts.length === 0) {
      setActiveMenu("Add Products")
    }
  }, [selectedProducts]
  )

  function ListItem({ product }: { product: Product }) {

    function selectItem(val: boolean) {
      if (val) {
        setSelectedProducts(p => [...p, product])
      } else {
        setSelectedProducts(p => p.filter(p => p._id !== product._id))
      }
    }

    function isSelected() {
      return selectedProducts.some(p => p._id === product._id);
    }

    return (
      <button onClick={() => selectItem(!isSelected())} className="w-full flex border-t border-gray-200 items-center px-4 py-3 justify-between bg-white hover:bg-gray-100 transition-all">

        <div className="flex items-center">
          <Checkbox id={"select" + product._id} checked={isSelected()} onChange={e => selectItem(e.target.checked)} />
          {
            product.media.length > 0 && (
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <Image src={product.media[0].url} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
              </div>
            )
          }
          <Text className="text-gray-800 ml-3">{product.title}</Text>
        </div>

        <div className="w-40 grid  place-items-center">
          <Text className="text-gray-800">{product.quantity}</Text>
        </div>

      </button>
    )
  }

  return (

    <div className=" flex flex-col gap-4 my-4">

      <div className="w-full flex border-t border-gray-200 pt-4 justify-between px-4">
        <Text className="font-bold text-gray-800">Products</Text>
        <div className="w-40 grid  place-items-center">
          <Text className="font-bold text-gray-800">Total Available</Text>
        </div>
      </div>

      <div className="w-full">
        {
          selectedProducts.map(p => <ListItem key={p._id} product={p} />)
        }
      </div>

    </div>
  )
}

function ProductsMenu({ load, selectedProducts, setSelectedProducts }: { load: () => Promise<Product[]>; selectedProducts: Product[], setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {

  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);

  // !bug: TODO: fetchProducts is run every time `selectProducts` changes.
  React.useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const products = await load();
        setProducts(products);
      }
      catch (error) {
        toast.error("Failed to fetch products");
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchProducts();
  }, [])

  function ListItem({ product }: { product: Product }) {

    function selectItem(val: boolean) {
      if (val) {
        setSelectedProducts(p => [...p, product])
      } else {
        setSelectedProducts(p => p.filter(p => p._id !== product._id))
      }
    }

    function isSelected() {
      return selectedProducts.some(p => p._id === product._id);
    }

    return (
      <button onClick={() => selectItem(!isSelected())} className="w-full flex border-t border-gray-200 items-center px-4 py-3 justify-between bg-white hover:bg-gray-100 transition-all">

        <div className="flex items-center">
          <Checkbox id={"select" + product._id} checked={isSelected()} onChange={e => selectItem(e.target.checked)} />
          {
            product.media.length > 0 && (
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <Image src={product.media[0].url} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
              </div>
            )
          }
          <Text className="text-gray-800 ml-3">{product.title}</Text>
        </div>

        <div className="w-40 grid  place-items-center">
          <Text className="text-gray-800">{product.quantity}</Text>
        </div>

      </button>
    )
  }

  return (

    <div className=" flex flex-col gap-4 my-4">

      <div className="px-4 w-full">
        <Input id="search-query" value={query} icon={<AiOutlineSearch />} placeholder="Search products" onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="w-full flex border-t border-gray-200 pt-4 justify-between px-4">
        <Text className="font-bold text-gray-800">Products</Text>
        <div className="w-40 grid  place-items-center">
          <Text className="font-bold text-gray-800">Total Available</Text>
        </div>
      </div>

      <div className="w-full">
        {
          loading ? (
            <Spinner />
          ) : (
            products.map(p => <ListItem key={p._id} product={p} />)
          )
        }
      </div>

    </div>
  )
}

function Listmenu({ setSubMenu, load, paramsIdName }: { load: () => Promise<ListMenuItem[]>; paramsIdName: string; setSubMenu: React.Dispatch<React.SetStateAction<SubMenu>>; }) {

  const [items, setItems] = React.useState<ListMenuItem[]>([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchCollections() {
      setLoading(true)
      try {
        const items = await load();
        setItems(items);
      }
      catch (error) {
        toast.error("Failed to fetch collections");
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchCollections();
  }, [])

  function ListItem({ item }: { item: ListMenuItem }) {
    return (
      <button className="flex w-full justify-between px-4 py-3 border-t border-gray-200 hover:bg-gray-100 bg-white transition-all" onClick={() => setSubMenu({ title: item.title, params: new URLSearchParams({ [paramsIdName]: item._id }) })}>
        <Text className="text-gray-800">{item.title}</Text>
        <IoIosArrowForward size={14} className="text-neutral-500" />
      </button>
    )
  }

  return (

    <div className=" flex flex-col gap-4 my-4">

      <div className="px-4 w-full">
        <Input id="search-query" value={query} icon={<AiOutlineSearch />} placeholder="Search products" onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="w-full">
        {
          loading ? (
            <Spinner />
          ) : (
            items.map(c => <ListItem key={c._id} item={c} />)
          )
        }
      </div>

    </div>
  )
}
