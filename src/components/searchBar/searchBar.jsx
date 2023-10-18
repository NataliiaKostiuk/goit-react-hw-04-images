import { Formik} from 'formik';
import * as Yup from 'yup';
import {
  Header,
  SearchForm,
  SearchButton,
  Input,
} from './searchBar.styled';
 
const formSchema = Yup.object().shape({
  query: Yup.string().required('This field is required!').trim().lowercase(),
})

export const SearchBar = ({handleSubmit}) => {
    return (
        <Header>
 <Formik
       initialValues={{
         query: '',
          }}
  validationSchema={formSchema}        
  onSubmit={(values, actions) => {
      handleSubmit(values.query)
   actions.resetForm(); 
       }}>      
<SearchForm>
  <Input name="query" type="text" placeholder="Search images and photos" />
      <SearchButton type="submit">
              <span >Search</span>
            </SearchButton>
 </SearchForm>
      
 </Formik> 
</Header>
    )
}
