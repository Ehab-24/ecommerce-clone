import React from "react";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Datatable from "@/components/products/purchase_orders/Datatable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import LinkMini from "@/components/LinkMini";


export default function PurchaseOrdersPage() {

  const purchaseOrders: PurchaseOrder[] = [
    {
      _id: '1',
      currency: 'USD',
      destination: 'Some Destination',
      paymentTerms: 'Net 30',
      status: 'ordered',
      shipping: {
        arrivalDate: new Date('2023-12-15'),
        carrier: 'Carrier Name',
        trackingNumber: 'ABC123456789',
      },
      products: [
        {
          title: "Coffee Maker",
          description: "Modern coffee maker with multiple brewing options",
          price: 79.99,
          compareAtPrice: 99.99,
          chargeTaxes: true,
          tax: 0.0,
          taxRate: 0.0,
          costPerItem: 50.0,
          profit: 29.99,
          margin: 37,
          trackQuantity: true,
          quantity: 30,
          continueSellingWhenOutOfStock: false,
          hasSku: true,
          sku: "CM001",
          barcode: "1122334455",
          isPhysicalProduct: true,
          weight: 1.5,
          weightUnit: "kg",
          countryOfOrigin: "China",
          status: "active",
          productCategory: "Appliances",
          productType: "Coffee Maker",
          vendor: "Vendor C",
          collection: "Kitchen Essentials",
          tags: ["Kitchen", "Coffee", "Appliances"],
          seo: {
            title: 'Coffee Maker',
            description: 'Modern coffee maker with multiple brewing options',
          },
          media: [
            {
              url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
              altText: 'Coffee Maker',
              type: 'image'
            },
            {
              url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
              altText: 'Coffee Maker',
              type: 'image'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Yoga Mat",
          description: "Eco-friendly yoga mat for comfortable workouts",
          price: 29.99,
          compareAtPrice: 39.99,
          chargeTaxes: true,
          tax: 0.0,
          taxRate: 0.0,
          costPerItem: 15.0,
          profit: 14.99,
          margin: 50,
          trackQuantity: true,
          quantity: 60,
          continueSellingWhenOutOfStock: false,
          hasSku: true,
          sku: "YM001",
          barcode: "9876543211",
          isPhysicalProduct: true,
          weight: 1.0,
          weightUnit: "kg",
          countryOfOrigin: "India",
          status: "active",
          productCategory: "Fitness",
          productType: "Yoga Mat",
          vendor: "Vendor D",
          collection: "Fitness Gear",
          tags: ["Yoga", "Fitness", "Health"],
          seo: {
            title: 'Yoga Mat',
            description: 'Eco-friendly yoga mat for comfortable workouts',
          },
          media: [
            {
              url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
              altText: 'Coffee Maker',
              type: 'image'
            },
            {
              url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
              altText: 'Coffee Maker',
              type: 'image'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      total: 91.97,
      referenceNumber: 'REF12345',
      noteToSupplier: 'Please ensure timely delivery.',
      tags: ['urgent', 'electronics'],
      supplier: {
        company: 'ABC Company',
        postalCode: '12345',
        city: 'City Name',
        email: 'supplier@example.com',
        apartment: 'Apt 123',
        country: 'Country Name',
        contactName: 'ABC Suppliers',
        address: 'Supplier Address',
        phoneNumber: '123-456-7890',
        name: 'Supplier Name',
      },
      costAdjustments: [
        { name: 'Discount', value: -5.0 },
        { name: 'Shipping', value: 6.98 },
      ],
    },
    {
      _id: '2',
      destination: 'Another Destination',
      status: 'received',
      currency: 'USD',
      shipping: {
        arrivalDate: new Date('2023-12-20'),
        carrier: 'Another Carrier',
        trackingNumber: 'XYZ987654321',
      },
      products: [
        {
          title: "Yoga Mat",
          description: "Eco-friendly yoga mat for comfortable workouts",
          price: 29.99,
          compareAtPrice: 39.99,
          chargeTaxes: true,
          tax: 3.0,
          taxRate: 10,
          costPerItem: 15.0,
          profit: 14.99,
          margin: 50,
          trackQuantity: true,
          quantity: 60,
          continueSellingWhenOutOfStock: false,
          hasSku: true,
          sku: "YM001",
          barcode: "9876543211",
          isPhysicalProduct: true,
          weight: 1.0,
          weightUnit: "kg",
          countryOfOrigin: "India",
          status: "active",
          productCategory: "Fitness",
          productType: "Yoga Mat",
          vendor: "Vendor D",
          collection: "Fitness Gear",
          tags: ["Yoga", "Fitness", "Health"],
          seo: {
            title: 'Yoga Mat',
            description: 'Eco-friendly yoga mat for comfortable workouts',
          },
          media: [
            {
              url: 'https://loremflickr.com/cache/resized/65535_52933847621_1b59865752_320_280_nofilter.jpg',
              altText: 'Coffee Maker',
              type: 'image'
            },
            {
              url: 'https://loremflickr.com/cache/resized/65535_52552903348_288981b690_320_280_nofilter.jpg',
              altText: 'Coffee Maker',
              type: 'image'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      total: 46.47,
      referenceNumber: 'REF67890',
      noteToSupplier: 'Thank you for the prompt delivery.',
      tags: ['clothing'],
      supplier: {
        _id: 's2',
        company: 'XYZ Company',
        postalCode: '98765',
        city: 'Another City',
        email: 'spplier2@domain.com',
        country: 'Another Country',
        apartment: 'Apt 987',
        contactName: 'XYZ Suppliers',
        address: 'Another Supplier Address',
        phoneNumber: '987-654-3210',
        name: 'Another Supplier Name',
      },
      costAdjustments: [],
    }
  ]

  return (
    <div className="bg-gray-100 min-h-full h-full p-8">
      <div className=" w-full flex justify-between">
        <Heading>Purchase Orders</Heading>
        <LinkMini href="purchase_orders/new">Add Purchase Order</LinkMini>
      </div>
      <div className="h-8" />

      {
        purchaseOrders && purchaseOrders.length > 0 ? (
          <Datatable purchaseOrders={purchaseOrders} />
        ) : (
          <Card className="flex flex-col items-center justify-center py-16">
            <Image
              src="/orders-home-img.svg"
              width="250"
              height="250"
              alt="No Orders Image"
            />
            <Title>Manage your purchase orders</Title>
            <Text className="text-center pb-4 w-96">
              Track and receive inventory ordered from suppliers.
            </Text>
            <LinkMini href="purchase_orders/new">Create Purchase Order</LinkMini>
          </Card>
        )
      }

    </div>
  );
}
