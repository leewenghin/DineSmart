import Table from "../../components/admin/table";

const columnTitle = [
  {
    name: "ID",
  },
  {
    name: "Title",
  },
  {
    name: "Active",
  },
  {
    name: "Actions",
  },
];

type TField = {
  id: number;
  name: string;
  published: boolean;
};

const TField: TField = {
  id: 1,
  name: "Example Name",
  published: true,
};

type TSubmitVariant = Omit<TField, "id">;

const TSubmitVariant: TSubmitVariant = {
  name: "Example Name",
  published: true,
};

const variant_group = ({ changeIP }: { changeIP: string }) => {
  const getVariantGroupLink = `http://${changeIP}:8000/api/variantgroup/`;

  return (
    <Table
      page={"Variant Group"}
      getLink={getVariantGroupLink}
      setLink={getVariantGroupLink}
      setIDLink={getVariantGroupLink}
      columnTitle={columnTitle}
      TField={TField}
      TSubmitVariant={TSubmitVariant}
    ></Table>
  );
};

export default variant_group;
