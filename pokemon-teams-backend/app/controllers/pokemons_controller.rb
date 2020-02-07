class PokemonsController < ApplicationController
    before_action :find_pokemon, only: [:show, :destroy]
    def index 
        @pokemons = Pokemon.all 
        render json: @pokemons
    end

    def show 
        render json: @pokemon
    end

    def new 
        @pokemon = Pokemon.new
    end

    def create 
        if Trainer.find(params[:trainer_id]).pokemons.count >= 6
            render json: {error: "Party is Full!"}
        else 
            @pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
            render json: @pokemon
        end
    end

    def destroy
        @pokemon.destroy
    end

    private 

	def find_pokemon
		@pokemon = Pokemon.find(params[:id])
	end
end
