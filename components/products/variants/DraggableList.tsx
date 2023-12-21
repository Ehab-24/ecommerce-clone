import Text from "@/components/Text"
import Input from "@/components/Input"
import Select from "@/components/Select"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import { ApiProduct, VariantOption } from "@/types/product"
import React from "react"
import { DragDropContext, Droppable, Draggable, OnDragEndResponder, DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd"
import { IoIosClose } from "react-icons/io"
import { RxDragHandleDots2 } from "react-icons/rx"
import { RiDeleteBin6Line } from "react-icons/ri"

export default function DraggableList({ product, defaultEdit = false, setProduct, loading }: { product: ApiProduct, loading: boolean, defaultEdit?: boolean, setProduct: React.Dispatch<React.SetStateAction<ApiProduct>> }) {

  const handleDrop: OnDragEndResponder = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...product.variantOptions];
    // Remove dragged item
    // const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setProduct({ ...product, variantOptions: updatedList });
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="gap-4 flex w-full flex-col">
              {product.variantOptions.map((vo, index) => (
                <Draggable key={vo.name} draggableId={vo.name} index={index}>
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="w-full px-4 border-b border-gray-300 pb-4"
                    >
                      <EditVariant loading={loading} defaultEdit={defaultEdit} provided={provided} snapshot={snapshot} variantOption={vo} index={index} product={product} setProduct={setProduct} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

function EditVariant({ variantOption, defaultEdit = false, provided, snapshot, index, product, setProduct, loading }: { index: number, product: ApiProduct, defaultEdit?: boolean, provided: DraggableProvided, snapshot: DraggableStateSnapshot, setProduct: React.Dispatch<React.SetStateAction<ApiProduct>>, variantOption: VariantOption, loading: boolean }) {

  const [edit, setEdit] = React.useState(defaultEdit);

  function variantsInclude(name: string): boolean {
    return product.variantOptions.map((v) => v.name).includes(name);
  }

  function getPlaceholder(name: string): string {
    switch (name) {
      case "color":
        return "Red, Blue, Green";
      case "size":
        return "Small, Medium, Large";
      case "material":
        return "Cotton, Polyester";
      case "style":
        return "Slim fit, Regular fit";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="flex pt-4 gap-4 w-full items-start">

        <div
          {...provided.dragHandleProps}
          id="anchor"
          className="w-12 h-full bg-white"
          style={{
            pointerEvents: snapshot.isDragging ? 'none' : 'auto',
          }}
        >
          <RxDragHandleDots2
            className="text-sm text-[#1a1a1a]"
            size={20}
          />
        </div>

        {
          edit ? (
            <div className="flex-col w-full">
              <Select
                disabled={loading}
                value={variantOption.name}
                label="Option Name"
                onChange={(e) => {
                  const newVariants = [...product.variantOptions];
                  newVariants[index].name = e.target.value as string;
                  setProduct({ ...product, variantOptions: newVariants });
                }}
                options={[
                  {
                    value: "color",
                    label: "Color",
                    disabled: variantsInclude("color"),
                  },
                  {
                    value: "size",
                    label: "Size",
                    disabled: variantsInclude("size"),
                  },
                  {
                    value: "material",
                    label: "Material",
                    disabled: variantsInclude("material"),
                  },
                  {
                    value: "style",
                    label: "Style",
                    disabled: variantsInclude("style"),
                  },
                ]}
              />

              <div className="w-full mt-4">
                <Input
                  id="variant-values"
                  disabled={loading}
                  label="Option Values"
                  placeholder={getPlaceholder(variantOption.name)}
                  onKeyDown={(e) => {
                    const value = e.currentTarget.value;
                    if (e.key === "Enter" && value !== "") {
                      const newVariants = [...product.variantOptions];
                      newVariants[index].values = [
                        ...newVariants[index].values,
                        value,
                      ];
                      setProduct({ ...product, variantOptions: newVariants });
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>

              <div className="w-full flex mt-4 gap-1">
                {variantOption.values.map((v, i) => (
                  <div
                    key={i}
                    className="bg-slate-200 text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    {v}
                    <button
                      disabled={loading}
                      onClick={() => {
                        const newVariants = [...product.variantOptions];
                        newVariants[index].values = newVariants[
                          index
                        ].values.filter((val) => val !== v);
                        setProduct({ ...product, variantOptions: newVariants });
                      }}
                    >
                      <IoIosClose size={20} />
                    </button>
                  </div>
                ))}
              </div>
              {
                edit && <div className="mt-4 w-min">
                  <OutlinedButton onClick={() => setEdit(false)}>Done</OutlinedButton>
                </div>
              }
            </div>

          ) : (

            <div className="flex flex-col w-full">
              <Text className="text-gray-900 font-bold">{variantOption.name}</Text>
              <div className="flex gap-4 mt-2 ml-2">
                {variantOption.values.map(v => (
                  <Text key={v}>{v}</Text>
                ))}
              </div>
            </div>

          )
        }

        <div>
          {
            edit ? (
              <button
                disabled={loading}
                onClick={() => setProduct({ ...product, variantOptions: product.variantOptions.filter((v) => v !== product.variantOptions[index]) })}
                className="p-2 rounded-md self-start mt-[22px] hover:bg-black/10 transition-all"
              >
                <RiDeleteBin6Line className="text-sm text-[#1a1a1a]" />
              </button>
            ) : (
              <OutlinedButton onClick={() => setEdit(true)}>Edit</OutlinedButton>
            )
          }
        </div>
      </div>
    </>
  )
}
