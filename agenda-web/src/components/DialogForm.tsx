import { Dialog } from "primereact/dialog";
import type { Contact } from "../types/contact";
import { schema } from "../types/contact";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import z from "zod";
import { useForm } from "react-hook-form";
import { classNames } from "primereact/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { contactService } from "../services/contactService";
import { Toast } from "primereact/toast";

interface DialogProps {
  visibleDialog: boolean;
  obj: Contact;
  onClose: () => void;
  onSave?: (data: Contact) => void;
}

type FormDialog = z.infer<typeof schema>;

export function DialogForm({ visibleDialog, obj, onClose }: DialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormDialog>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: obj.name,
      contact: obj.contact,
      email: obj.email,
    },
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    setValue("name", obj.name);
    setValue("contact", obj.contact);
    setValue("email", obj.email);
  }, [obj, setValue]);

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleSave = (data: FormDialog) => {
    setIsSending(true);
    obj = {
      id: obj.id,
      name: data.name,
      email: data.email,
      contact: data.contact,
    };

    if (obj.id === null) {
      onCreate();
    } else {
      onUpdate();
    }
  };

  const onCreate = () => {
    contactService
      .create(obj)
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Registro salvo com sucesso!",
        });
        handleCancel();
      })
      .catch((error) => {
        console.error("Erro ao salvar: ", error);
        toast.current?.show({
          severity: "error",
          summary: "Erro!",
          detail: "Não foi possível salvar o registro!",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const onUpdate = () => {
    contactService
      .update(obj)
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso!",
          detail: "Registro salvo com sucesso!",
        });
        handleCancel();
      })
      .catch((error) => {
        console.error("Erro ao salvar: ", error);
        toast.current?.show({
          severity: "error",
          summary: "Erro!",
          detail: "Não foi possível salvar o registro!",
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const footer = (
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
        loading={isSubmitting || isSending}
        form="contactForm"
      />
    </>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visibleDialog}
        header="Formulário de Contato"
        modal
        className="p-fluid"
        style={{ width: "40rem" }}
        footer={footer}
        onHide={handleCancel}
      >
        <form id="contactForm" onSubmit={handleSubmit(handleSave)}>
          <div className="field">
            <label htmlFor="name">Nome</label>
            <InputText
              id="name"
              placeholder="Digite o nome"
              maxLength={150}
              {...register("name")}
              className={classNames({
                "p-invalid": isSubmitted && errors.name,
              })}
            />
            {errors.name && (
              <small className="p-error">{errors.name.message}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact">Contato</label>
            <InputText
              id="contact"
              placeholder="Digite o contato"
              maxLength={15}
              {...register("contact")}
              className={classNames({
                "p-invalid": isSubmitted && errors.contact,
              })}
            />
            {errors.contact && (
              <small className="p-error">{errors.contact.message}</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <InputText
              id="email"
              placeholder="Digite o e-mail"
              {...register("email")}
              className={classNames({
                "p-invalid": isSubmitted && errors.email,
              })}
            />
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>
        </form>
      </Dialog>
    </>
  );
}
