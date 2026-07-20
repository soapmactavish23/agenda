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

  return (
    <div className="p-8">
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
            body={
              <>
                <h1>teste</h1>
              </>
            }
          ></Column>
        </DataTable>
      </Fieldset>
    </div>
  );
}
