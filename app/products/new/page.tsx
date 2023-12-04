
import Card from "@/components/Card";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import FilledButton from "@/components/buttons/FilledButton";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const countries = [
  { "label": "Select", "value": "" },
  { "label": "Afghanistan", "value": "AF" },
  { "label": "Åland Islands", "value": "AX" },
  { "label": "Albania", "value": "AL" },
  { "label": "Algeria", "value": "DZ" },
  { "label": "Andorra", "value": "AD" },
  { "label": "Angola", "value": "AO" },
  { "label": "Anguilla", "value": "AI" },
  { "label": "Antigua & Barbuda", "value": "AG" },
  { "label": "Argentina", "value": "AR" },
  { "label": "Armenia", "value": "AM" },
  { "label": "Aruba", "value": "AW" },
  { "label": "Ascension Island", "value": "AC" },
  { "label": "Australia", "value": "AU" },
  { "label": "Austria", "value": "AT" },
  { "label": "Azerbaijan", "value": "AZ" },
  { "label": "Bahamas", "value": "BS" },
  { "label": "Bahrain", "value": "BH" },
  { "label": "Bangladesh", "value": "BD" },
  { "label": "Barbados", "value": "BB" },
  { "label": "Belarus", "value": "BY" },
  { "label": "Belgium", "value": "BE" },
  { "label": "Belize", "value": "BZ" },
  { "label": "Benin", "value": "BJ" },
  { "label": "Bermuda", "value": "BM" },
  { "label": "Bhutan", "value": "BT" },
  { "label": "Bolivia", "value": "BO" },
  { "label": "Bosnia & Herzegovina", "value": "BA" },
  { "label": "Botswana", "value": "BW" },
  { "label": "Brazil", "value": "BR" },
  { "label": "British Indian Ocean Territory", "value": "IO" },
  { "label": "British Virgin Islands", "value": "VG" },
  { "label": "Brunei", "value": "BN" },
  { "label": "Bulgaria", "value": "BG" },
  { "label": "Burkina Faso", "value": "BF" },
  { "label": "Burundi", "value": "BI" },
  { "label": "Cambodia", "value": "KH" },
  { "label": "Cameroon", "value": "CM" },
  { "label": "Canada", "value": "CA" },
  { "label": "Cape Verde", "value": "CV" },
  { "label": "Caribbean Netherlands", "value": "BQ" },
  { "label": "Cayman Islands", "value": "KY" },
  { "label": "Central African Republic", "value": "CF" },
  { "label": "Chad", "value": "TD" },
  { "label": "Chile", "value": "CL" },
  { "label": "China", "value": "CN" },
  { "label": "Christmas Island", "value": "CX" },
  { "label": "Cocos (Keeling) Islands", "value": "CC" },
  { "label": "Colombia", "value": "CO" },
  { "label": "Comoros", "value": "KM" },
  { "label": "Congo - Brazzaville", "value": "CG" },
  { "label": "Congo - Kinshasa", "value": "CD" },
  { "label": "Cook Islands", "value": "CK" },
  { "label": "Costa Rica", "value": "CR" },
  { "label": "Croatia", "value": "HR" },
  { "label": "Curaçao", "value": "CW" },
  { "label": "Cyprus", "value": "CY" },
  { "label": "Czechia", "value": "CZ" },
  { "label": "Côte d’Ivoire", "value": "CI" },
  { "label": "Denmark", "value": "DK" },
  { "label": "Djibouti", "value": "DJ" },
  { "label": "Dominica", "value": "DM" },
  { "label": "Dominican Republic", "value": "DO" },
  { "label": "Ecuador", "value": "EC" },
  { "label": "Egypt", "value": "EG" },
  { "label": "El Salvador", "value": "SV" },
  { "label": "Equatorial Guinea", "value": "GQ" },
  { "label": "Eritrea", "value": "ER" },
  { "label": "Estonia", "value": "EE" },
  { "label": "Eswatini", "value": "SZ" },
  { "label": "Ethiopia", "value": "ET" },
  { "label": "Falkland Islands", "value": "FK" },
  { "label": "Faroe Islands", "value": "FO" },
  { "label": "Fiji", "value": "FJ" },
  { "label": "Finland", "value": "FI" },
  { "label": "France", "value": "FR" },
  { "label": "French Guiana", "value": "GF" },
  { "label": "French Polynesia", "value": "PF" },
  { "label": "French Southern Territories", "value": "TF" },
  { "label": "Gabon", "value": "GA" },
  { "label": "Gambia", "value": "GM" },
  { "label": "Georgia", "value": "GE" },
  { "label": "Germany", "value": "DE" },
  { "label": "Ghana", "value": "GH" },
  { "label": "Gibraltar", "value": "GI" },
  { "label": "Greece", "value": "GR" },
  { "label": "Greenland", "value": "GL" },
  { "label": "Grenada", "value": "GD" },
  { "label": "Guadeloupe", "value": "GP" },
  { "label": "Guatemala", "value": "GT" },
  { "label": "Guernsey", "value": "GG" },
  { "label": "Guinea", "value": "GN" },
  { "label": "Guinea-Bissau", "value": "GW" },
  { "label": "Guyana", "value": "GY" },
  { "label": "Haiti", "value": "HT" },
  { "label": "Honduras", "value": "HN" },
  { "label": "Hong Kong SAR", "value": "HK" },
  { "label": "Hungary", "value": "HU" },
  { "label": "Iceland", "value": "IS" },
  { "label": "India", "value": "IN" },
  { "label": "Indonesia", "value": "ID" },
  { "label": "Iraq", "value": "IQ" },
  { "label": "Ireland", "value": "IE" },
  { "label": "Isle of Man", "value": "IM" },
  { "label": "Israel", "value": "IL" },
  { "label": "Italy", "value": "IT" },
  { "label": "Jamaica", "value": "JM" },
  { "label": "Japan", "value": "JP" },
  { "label": "Jersey", "value": "JE" },
  { "label": "Jordan", "value": "JO" },
  { "label": "Kazakhstan", "value": "KZ" },
  { "label": "Kenya", "value": "KE" },
  { "label": "Kiribati", "value": "KI" },
  { "label": "Kosovo", "value": "XK" },
  { "label": "Kuwait", "value": "KW" },
  { "label": "Kyrgyzstan", "value": "KG" },
  { "label": "Laos", "value": "LA" },
  { "label": "Latvia", "value": "LV" },
  { "label": "Lebanon", "value": "LB" },
  { "label": "Lesotho", "value": "LS" },
  { "label": "Liberia", "value": "LR" },
  { "label": "Libya", "value": "LY" },
  { "label": "Liechtenstein", "value": "LI" },
  { "label": "Lithuania", "value": "LT" },
  { "label": "Luxembourg", "value": "LU" },
  { "label": "Macao SAR", "value": "MO" },
  { "label": "Madagascar", "value": "MG" },
  { "label": "Malawi", "value": "MW" },
  { "label": "Malaysia", "value": "MY" },
  { "label": "Maldives", "value": "MV" },
  { "label": "Mali", "value": "ML" },
  { "label": "Malta", "value": "MT" },
  { "label": "Martinique", "value": "MQ" },
  { "label": "Mauritania", "value": "MR" },
  { "label": "Mauritius", "value": "MU" },
  { "label": "Mayotte", "value": "YT" },
  { "label": "Mexico", "value": "MX" },
  { "label": "Moldova", "value": "MD" },
  { "label": "Monaco", "value": "MC" },
  { "label": "Mongolia", "value": "MN" },
  { "label": "Montenegro", "value": "ME" },
  { "label": "Montserrat", "value": "MS" },
  { "label": "Morocco", "value": "MA" },
  { "label": "Mozambique", "value": "MZ" },
  { "label": "Myanmar (Burma)", "value": "MM" },
  { "label": "Namibia", "value": "NA" },
  { "label": "Nauru", "value": "NR" },
  { "label": "Nepal", "value": "NP" },
  { "label": "Netherlands", "value": "NL" },
  { "label": "New Caledonia", "value": "NC" },
  { "label": "New Zealand", "value": "NZ" },
  { "label": "Nicaragua", "value": "NI" },
  { "label": "Niger", "value": "NE" },
  { "label": "Nigeria", "value": "NG" },
  { "label": "Niue", "value": "NU" },
  { "label": "Norfolk Island", "value": "NF" },
  { "label": "North Macedonia", "value": "MK" },
  { "label": "Norway", "value": "NO" },
  { "label": "Oman", "value": "OM" },
  { "label": "Pakistan", "value": "PK" },
  { "label": "Palestinian Territories", "value": "PS" },
  { "label": "Panama", "value": "PA" },
  { "label": "Papua New Guinea", "value": "PG" },
  { "label": "Paraguay", "value": "PY" },
  { "label": "Peru", "value": "PE" },
  { "label": "Philippines", "value": "PH" },
  { "label": "Pitcairn Islands", "value": "PN" },
  { "label": "Poland", "value": "PL" },
  { "label": "Portugal", "value": "PT" },
  { "label": "Qatar", "value": "QA" },
  { "label": "Réunion", "value": "RE" },
  { "label": "Romania", "value": "RO" },
  { "label": "Russia", "value": "RU" },
  { "label": "Rwanda", "value": "RW" },
  { "label": "Samoa", "value": "WS" },
  { "label": "San Marino", "value": "SM" },
  { "label": "São Tomé & Príncipe", "value": "ST" },
  { "label": "Saudi Arabia", "value": "SA" },
  { "label": "Senegal", "value": "SN" },
  { "label": "Serbia", "value": "RS" },
  { "label": "Seychelles", "value": "SC" },
  { "label": "Sierra Leone", "value": "SL" },
  { "label": "Singapore", "value": "SG" },
  { "label": "Sint Maarten", "value": "SX" },
  { "label": "Slovakia", "value": "SK" },
  { "label": "Slovenia", "value": "SI" },
  { "label": "Solomon Islands", "value": "SB" },
  { "label": "Somalia", "value": "SO" },
  { "label": "South Africa", "value": "ZA" },
  { "label": "South Georgia & South Sandwich Islands", "value": "GS" },
  { "label": "South Korea", "value": "KR" },
  { "label": "South Sudan", "value": "SS" },
  { "label": "Spain", "value": "ES" },
  { "label": "Sri Lanka", "value": "LK" },
  { "label": "St. Barthélemy", "value": "BL" },
  { "label": "St. Helena", "value": "SH" },
  { "label": "St. Kitts & Nevis", "value": "KN" },
  { "label": "St. Lucia", "value": "LC" },
  { "label": "St. Martin", "value": "MF" },
  { "label": "St. Pierre & Miquelon", "value": "PM" },
  { "label": "St. Vincent & Grenadines", "value": "VC" },
  { "label": "Sudan", "value": "SD" },
  { "label": "Suriname", "value": "SR" },
  { "label": "Svalbard & Jan Mayen", "value": "SJ" },
  { "label": "Sweden", "value": "SE" },
  { "label": "Switzerland", "value": "CH" },
  { "label": "Taiwan", "value": "TW" },
  { "label": "Tajikistan", "value": "TJ" },
  { "label": "Tanzania", "value": "TZ" },
  { "label": "Thailand", "value": "TH" },
  { "label": "Timor-Leste", "value": "TL" },
  { "label": "Togo", "value": "TG" },
  { "label": "Tokelau", "value": "TK" },
  { "label": "Tonga", "value": "TO" },
  { "label": "Trinidad & Tobago", "value": "TT" },
  { "label": "Tristan da Cunha", "value": "TA" },
  { "label": "Tunisia", "value": "TN" },
  { "label": "Turkey", "value": "TR" },
  { "label": "Turkmenistan", "value": "TM" },
  { "label": "Turks & Caicos Islands", "value": "TC" },
  { "label": "Tuvalu", "value": "TV" },
  { "label": "U.S. Outlying Islands", "value": "UM" },
  { "label": "Uganda", "value": "UG" },
  { "label": "Ukraine", "value": "UA" },
  { "label": "United Arab Emirates", "value": "AE" },
  { "label": "United Kingdom", "value": "GB" },
  { "label": "United States", "value": "US" },
  { "label": "Uruguay", "value": "UY" },
  { "label": "Uzbekistan", "value": "UZ" },
  { "label": "Vanuatu", "value": "VU" },
  { "label": "Vatican City", "value": "VA" },
  { "label": "Venezuela", "value": "VE" },
  { "label": "Vietnam", "value": "VN" },
  { "label": "Wallis & Futuna", "value": "WF" },
  { "label": "Western Sahara", "value": "EH" },
  { "label": "Yemen", "value": "YE" },
  { "label": "Zambia", "value": "ZM" },
  { "label": "Zimbabwe", "value": "ZW" }
]

export default function NewProductPage() {
  return (
    <div className="flex-col flex gap-6 p-8">
      <div className="flex items-center gap-4 mb-8">
        <FaArrowLeft className="text-sm text-[#1a1a1a]" />
        <h1 className="text-xl font-bold text-[#1a1a1a]">Add Product</h1>
      </div>

      <Card className="flex flex-col gap-4 items-stretch">
        <Input label="Title" placeholder="Title" />
        <TextArea label="Description" />
      </Card>


      <Card className="flex flex-col gap-4 items-stretch">
        <h2 className="text-gray-900 font-bold">Pricing</h2>
        <div className="flex gap-4 mt-4">
          <Input label="Price" placeholder="$ 0.00" />
          <Input label="Compare-at Price" placeholder="$ 0.00" />
        </div>
        <Checkbox id="0" label="Charge Taxes on this Product" />
        <div className="flex gap-4 mt-4">
          <Input label="Cost per Item" placeholder="$ 0.00" />
          <Input label="Profit" placeholder="--" />
          <Input label="Margin" placeholder="--" />
        </div>
      </Card>


      <Card className=" flex-col flex gap-4">
        <h2 className="text-gray-900 font-bold">Inventory</h2>
        <Checkbox id="1" label="Track Quantity" />

        <div className=" flex items-center w-full justify-between mb-4">
          <p className="text-sm text-gray-900">Block 6-C2 Park</p>
          <Input label="" placeholder="0" />
        </div>
        <Checkbox id="2" label="Continue selling when out of stock" />
        <Checkbox id="3" label="This product has a SKU or barcode" />
      </Card>


      <Card className=" flex-col flex gap-4">
        <h2 className="text-gray-900 font-bold">Shipping</h2>
        <Checkbox id="4" label="This is a physical product" />

        <div className="h-4" />
        <div className=" w-full flex items-end justify-between mb-4">
          <Input label="Weight" placeholder="0.0" />
          <Select label="Weight Unit" options={[
            { value: "kg", label: "kg" },
            { value: "g", label: "g" },
            { value: "lb", label: "lb" },
            { value: "oz", label: "oz" },
          ]} />
        </div>

        <Select label="Country/Region of origin" options={countries} />
      </Card>

      <Card className=" flex-col flex gap-4">
        <h2 className="text-gray-900 font-bold">Status</h2>
        <Select label="Status" options={[
          { label: "Active", value: "active" },
          { label: "Draft", value: "draft" },
        ]} />
      </Card>

      <Card className=" flex-col flex gap-4">
        <h2 className="text-gray-900 font-bold">Product Organization</h2>

        <Input label="Product category" placeholder="Apparel & Accessories" />
        <Input label="Product Type" placeholder="" />
        <Input label="Vendor" placeholder="" />
        <Input label="Collections" placeholder="" />
        <Input label="Tags" placeholder="" />
      </Card>

      <FilledButton>
        Save
      </FilledButton>
    </div>
  )
}

