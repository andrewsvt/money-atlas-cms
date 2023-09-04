
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { CardsList, CardsCreate, CardsEdit } from './Cards';

export const App = () => (
    <Admin
        dataProvider={dataProvider}
		authProvider={authProvider}
        title="Money atlas admin panel"
	>
        <Resource name="cards" list={CardsList} create={CardsCreate} edit={CardsEdit} />
    </Admin>
);

    