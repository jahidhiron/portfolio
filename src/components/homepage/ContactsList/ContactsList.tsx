import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { IconType } from "react-icons";
import { ContactMethod } from "../types/interface";
import contacts from "../../../data/contacts-list.json";

interface ContactMethodsListProps {}

const IconMap: { [key: string]: IconType } = {
  ...FaIcons,
  ...MdIcons,
};

interface IconRendererProps {
  iconName: string;
  iconClass: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName, iconClass }) => {
  const IconComponent = IconMap[iconName];

  if (!IconComponent) {
    return (
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 text-white`}
      >
        ?
      </div>
    );
  }

  const isMailboxFooter = iconName === "MdMailOutline";
  const baseClasses = isMailboxFooter
    ? `w-6 h-6 ${iconClass}`
    : `w-8 h-8 flex items-center justify-center rounded-full ${iconClass}`;
  const iconSize = isMailboxFooter ? 24 : 18;

  return (
    <div className={baseClasses}>
      <IconComponent size={iconSize} />
    </div>
  );
};

const ContactMethodsList: React.FC<ContactMethodsListProps> = () => {
  const typedContacts = contacts as ContactMethod[];

  const primaryContact = typedContacts[0];
  const otherContacts = typedContacts;

  const formatSubtitle = (contact: ContactMethod): React.ReactNode => {
    if (contact.type === "facebook") {
      return (
        <>
          {/* <p className='text-sm text-gray-700'>
            {contact.link ? contact.link.replace("https://", "") : ""}
          </p> */}
          <p className='text-sm text-gray-500'>{contact.subtitle}</p>
        </>
      );
    }

    return (
      <>
        <a
          href={contact.link || "#"}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:underline break-all'
        >
          {contact.subtitle}
        </a>
        {/* {contact.secondaryLink && (
          <a
            href={contact.secondaryLink}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-1 block text-blue-600 hover:underline break-all'
          >
            {contact.secondaryLink}
          </a>
        )} */}
      </>
    );
  };

  return (
    <div className=' mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200'>
      <div className='p-5 flex items-center border-b border-gray-200'>
        <div className='w-1 h-8 bg-[#262956] mr-4 rounded-full hidden sm:block'></div>
        <h2 className='text-xl font-semibold text-gray-800'>Social Links</h2>
      </div>

      <div className='divide-y divide-gray-200'>
        {/* {primaryContact && (
          <div className='flex items-start justify-between p-4 hover:bg-gray-50 transition duration-150'>
            <div className='flex items-start'>
              <IconRenderer
                iconName={primaryContact.icon}
                iconClass={primaryContact.iconClass}
              />
              <div className='ml-4'>
                <p className='text-base font-semibold text-gray-800'>
                  {primaryContact.title}
                </p>
                {formatSubtitle(primaryContact)}
              </div>
            </div>
          </div>
        )} */}

        {otherContacts.map((contact, index) => (
          <div
            key={index}
            className='flex items-start justify-between p-4 hover:bg-gray-50 transition duration-150'
          >
            <div className='flex items-start'>
              <IconRenderer
                iconName={contact.icon}
                iconClass={contact.iconClass}
              />
              <div className='ml-4 text-sm'>
                <p className='font-semibold text-gray-800'>{contact.title}</p>
                {formatSubtitle(contact)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMethodsList;
