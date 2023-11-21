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
  const getVariantGroupLink = `http://192.168.1.24:8000/api/variantgroup/`;

  return (
    <Table
      page={"Variant"}
      getLink={getVariantLink}
      setLink={getVariantLink}
      setIDLink={getVariantLink}
      columnTitle={columnTitle}
      getVariantLink={getVariantGroupLink}
    ></Table>
  );
};

export default variant;
