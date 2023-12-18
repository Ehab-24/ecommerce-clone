import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Customer } from "@/types/customer";

import EditMarketing from "./modals/EditMarketing";
import ManageAddress from "./modals/ManageAddress";
import ManageTax from "./modals/ManageTax";
import EditContact from "./modals/EditContact";

import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import Addresses from "./modals/Addresses";

const CustomerOptionsPopover = ({ customer }: { customer: Customer }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MobileVerticalDotsMajor className="w-7 p-1.5 hover:bg-neutral-200 rounded-lg" />
      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-1.5 rounded-xl">
        <div className="flex flex-col p-0">
          <EditContact customer={customer} />
          <Addresses customer={customer} />
          <ManageTax customer={customer} />
          <EditMarketing customer={customer} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerOptionsPopover;
