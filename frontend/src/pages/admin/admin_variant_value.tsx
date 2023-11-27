import Table from "../../components/admin/table";

type TField = {
  id: number;
  title: string;
  name: string;
  published: boolean;
};

type TSubmitVariant = Omit<TField, "id">;

const columnTitle = [
  {
    name: "ID",
  },
  {
    name: "Title",
  },
  {
    name: "Value",
  },
  {
    name: "Active",
  },
  {
    name: "Actions",
  },
];

const variant = ({ changeIP }: { changeIP: string }) => {
  const getVariantLink = `http://${changeIP}:8000/api/variantvalue/`;
  const getVariantGroupLink = `http://${changeIP}:8000/api/variantgroup/`;
  const searchPlaceholder = "value";

  return (
    <Table
      page={"Variant"}
      getLink={getVariantLink}
      setLink={getVariantLink}
      getVariantLink={getVariantGroupLink}
      setIDLink={getVariantLink}
      columnTitle={columnTitle}
      searchPlaceholder={searchPlaceholder}
    ></Table>
  );
};

export default variant;
