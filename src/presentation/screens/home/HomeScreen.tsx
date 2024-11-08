import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { getpokemons } from '../../../actions/pokemons'
import { useQuery } from '@tanstack/react-query'

const HomeScreen = () => {

  const {} = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getpokemons(0),
    staleTime: 1000 * 60 * 60
  })

 

  return (
    <View>
      <Button  mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  )
}

export default HomeScreen
