import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { Fieldset } from "primereact/fieldset";

import { newContact, type Contact } from "./types/contact";
import { contactService } from "./services/contactService";
import { useQuery } from "@tanstack/react-query";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { DialogForm } from "./components/DialogForm";

export default function App() {
  const dt = useRef<DataTable<Contact[]>>(null);
  const [listFiltered, setListFiltered] = useState<Contact[]>([]);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [obj, setObj] = useState<Contact>(newContact);

  const {
    data: list,
    isLoading,
    refetch,
  } = useQuery<Contact[]>({
    queryKey: ["FIND_ALL"],
    queryFn: async () => {
      const response = await contactService.findAll();
      setListFiltered(response);
      return response;
    },
  });

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    const result = list!.filter((res) =>
      res.name.toLocaleLowerCase().includes(search),
    );
    setListFiltered(result);
  };

  const handleDelete = (rowData: Contact) => {
    confirmDialog({
      header: "Confirmar",
      message: `Tem certeza que deseja deletar o registro #${rowData.name}?`,
      icon: "pi pi-info-circle",
      acceptLabel: "Confirmar",
      rejectLabel: "Cancelar",
      accept: async () => {
        await contactService.delete(rowData.id!);
        refetch();
      },
    });
  };

  const handleOnClose = () => {
    setVisibleDialog(false);
    setObj(newContact);
  };

  return (
    <div className="p-8">
      <DialogForm
        visibleDialog={visibleDialog}
        obj={obj}
        onClose={handleOnClose}
      />
      <ConfirmDialog />
      <Fieldset legend="Agenda">
        <DataTable
          ref={dt}
          value={listFiltered}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Exibindo {first} de {last} no total de {totalRecords} registros."
          header={
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
              <Button
                label="Novo"
                icon="pi pi-plus"
                severity="success"
                onClick={() => {
                  setVisibleDialog(true);
                }}
              />
              <InputText
                type="search"
                placeholder="Pesquisar"
                onInput={handleOnSearch}
              />
            </div>
          }
          loading={isLoading}
          emptyMessage="Nenhum registro Encontrado"
        >
          <Column field="id" header="#"></Column>
          <Column field="name" header="Nome"></Column>
          <Column field="contact" header="Contato"></Column>
          <Column field="email" header="E-mail"></Column>
          <Column
            body={(rowData: Contact) => {
              return (
                <>
                  <Button
                    icon="pi pi-pencil"
                    rounded
                    severity="success"
                    className="mr-2"
                    onClick={() => {
                      console.log("Editar");
                    }}
                  />
                  <Button
                    icon="pi pi-trash"
                    rounded
                    severity="danger"
                    onClick={() => handleDelete(rowData)}
                  />
                </>
              );
            }}
          ></Column>
        </DataTable>
      </Fieldset>
    </div>
  );
}
