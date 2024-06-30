import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CallLayout } from "@/types";
import { LayoutList } from "lucide-react";

const LayoutSelector = ({
  layout,
  setLayout,
}: {
  layout: CallLayout | string;
  setLayout: (layout: CallLayout | string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-[#19232d] hover:bg-[#4c535b] rounded-full p-2.5 cursor-pointer">
        <LayoutList size={18} className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-foreground">
        <DropdownMenuRadioGroup
          value={layout}
          onValueChange={(value) => setLayout(value)}
        >
          <DropdownMenuRadioItem
            className="cursor-pointer"
            value={CallLayout.GRID}
          >
            Grid
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer"
            value={CallLayout.SPEAKER_LEFT}
          >
            Speaker Left
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer"
            value={CallLayout.SPEAKER_RIGHT}
          >
            Speaker Right
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator className="bg-foreground" />
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LayoutSelector;
