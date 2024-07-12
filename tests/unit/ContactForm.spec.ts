import { mount } from '@vue/test-utils';
import ContactForm from '@/components/ContactForm.vue';
import { Contact } from '@/types/types';

describe('Тестирую компонент ContactForm.vue', () => {
  it('Форма отрисовывается корректно', () => {
    // Монтирование компонента
    const wrapper = mount(ContactForm, {
      props: {
        contact: {
          id: undefined,
          name: '',
          email: '',
          phone: '',
        } as Contact,
      },
    });

    // Проверка наличия элементов формы
    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.find('input#phone').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
  });

  it('Эмитирует событие \'save\' с данными контакта при отправке формы', async () => {
    // Монтирование компонента
    const wrapper = mount(ContactForm, {
      props: {
        contact: {
          id: undefined,
          name: '',
          email: '',
          phone: '',
        } as Contact,
      },
    });

    // Установка значений в полях формы
    await wrapper.find('input#name').setValue('John Snow');
    await wrapper.find('input#phone').setValue('+79998885566');
    await wrapper.find('input#email').setValue('john.snow@example.com');
    // Отправка формы
    await wrapper.find('form').trigger('submit.prevent');

    // Проверка эмита события save
    const emitted = wrapper.emitted('save');

    // Проверка что эмитировано ровно одно событие
    expect(emitted).toHaveLength(1);
    // и что первый аргумент этого события соответствует ожидаемому объекту данных
    expect(emitted?.[0]?.[0]).toMatchObject({
      name: 'John Snow',
      phone: '+79998885566',
      email: 'john.snow@example.com',
    });
  });

  it('Обновляет поля формы при изменении пропсов', async () => {
    // Монтирование компонента
    const wrapper = mount(ContactForm, {
      props: {
        contact: {
          id: 1,
          name: 'Jane Doe',
          email: 'jane.doe@qwe.com',
          phone: '0987654321',
        } as Contact,
      },
    });

    // Проверка наличия элементов формы
    const nameInput = wrapper.find('input#name').element as HTMLInputElement;
    const phoneInput = wrapper.find('input#phone').element as HTMLInputElement;
    const emailInput = wrapper.find('input#email').element as HTMLInputElement;

    // Проверка значений введенных в поля формы
    expect(nameInput.value).toBe('Jane Doe');
    expect(phoneInput.value).toBe('0987654321');
    expect(emailInput.value).toBe('jane.doe@qwe.com');

    // Проверка обновления входных параметров
    await wrapper.setProps({
      contact: {
        id: 2,
        name: 'Will Smith',
        email: 'will.smith@example.com',
        phone: '1002334455',
      } as Contact,
    });

    // Проверка значений введенных в поля формы
    expect(nameInput.value).toBe('Will Smith');
    expect(phoneInput.value).toBe('1002334455');
    expect(emailInput.value).toBe('will.smith@example.com');
  });
});
