import { Dialog } from "primereact/dialog";
import type { Contact } from "../types/contact";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface DialogProps {
  visibleDialog: boolean;
  obj: Contact;
  onClose: () => void;
  onSave?: (data: Contact) => void;
}

export function DialogForm({ visibleDialog, obj, onClose }: DialogProps) {
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      visible={visibleDialog}
      header="Formulário de Contato"
      modal
      className="p-fluid"
      style={{ width: "40rem" }}
      footer={
        <>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={handleCancel}
            className="p-button-text"
            severity="danger"
          />
          <Button
            type="submit"
            label="Salvar"
            icon="pi pi-check"
            severity="success"
          />
        </>
      }
      onHide={handleCancel}
    >
      <div className="field">
        <label htmlFor="name">Nome</label>
        <InputText id="name" placeholder="Digite o nome" />
      </div>
      <div className="field">
        <label htmlFor="contact">Contato</label>
        <InputText id="contact" placeholder="Digite o contato" />
      </div>
      <div className="field">
        <label htmlFor="email">E-mail</label>
        <InputText id="email" placeholder="Digite o e-mail" />
      </div>
    </Dialog>
  );
}
