import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { Fieldset } from "primereact/fieldset";

import type { Contact } from "./types/contact";
import { contactService } from "./services/contactService";
import { useQuery } from "@tanstack/react-query";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
export default function App() {
  const dt = useRef<DataTable<Contact[]>>(null);

  const {
    data: list,
    isLoading,
    refetch,
  } = useQuery<Contact[]>({
    queryKey: ["FIND_ALL"],
    queryFn: async () => {
      const response = await contactService.findAll();
      return response;
    },
  });

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

  return (
    <div className="p-8">
      <ConfirmDialog />
      <Fieldset legend="Agenda">
        <DataTable
          ref={dt}
          value={list}
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
                  console.log("Clicou em novo");
                }}
              />
              <InputText
                type="search"
                placeholder="Pesquisar"
                onInput={(event) => {
                  console.log(event);
                }}
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
