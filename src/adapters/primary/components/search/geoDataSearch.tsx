import { observer, useLocalStore } from 'mobx-react'
import React, { useCallback } from 'react'

import { useCoreUseCases, useStores } from 'adapters/primary/hooks/index'
import type { TCity } from 'core/domain/models/city/cityModel'
import type { DeepReadonly } from 'superTypes'

import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, withStyles } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import LocationCityIcon from '@material-ui/icons/LocationCity'

import './geoDataSearch.scss'

enum GeoDataType {
    COUNTRY = 'country',
    CITY = 'city'
}

type TLocalStore = {
    inputValue: string
    selectValue: string
    setInputValue: (value: string) => void
    setSelectValue: (value: string) => void
}

type TGeoDataTypeSelectOption = Readonly<{
    value: string
    label: string
}>

const geoDataTypeSelectOptions: TGeoDataTypeSelectOption[] = [
    {
        value: 'country',
        label: 'Country'
    },
    {
        value: 'city',
        label: 'City'
    }
]

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const CustomTextfield = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiOutlinedInput-root': {
                '&:hover:not(.Mui-error) fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
                '&.Mui-focused:not(.Mui-error) fieldset': {
                    transition: theme.transitions.create(['border-color']),
                    borderColor: '#00abbe',
                    borderWidth: '1px'
                }
            }
        }
    })
)(TextField)

export const GeoDataSearch: React.FC = observer(() => {
    const { geoDataStore } = useStores()
    const { retrieveCitiesUseCase } = useCoreUseCases()
    const localState = useLocalStore(
        (): TLocalStore => ({
            inputValue: '',
            selectValue: GeoDataType.COUNTRY,
            setInputValue: (value: string): void => {
                localState.inputValue = value
            },
            setSelectValue: (value: string): void => {
                localState.selectValue = value
            }
        })
    )

    const handleSelectValueChange = useCallback(
        (event: unknown): void => {
            const value = (event as React.ChangeEvent<HTMLInputElement>).target.value
            localState.setSelectValue(value)
        },
        [localState]
    )

    const handleInputValueChange = useCallback(
        (event: unknown): void => {
            const value = (event as React.ChangeEvent<HTMLInputElement>).target.value
            localState.setInputValue(value)
        },
        [localState]
    )

    const handleSearch = useCallback((): void => {
        if (localState.inputValue) {
            const filter = { where: { name: { eq: localState.inputValue } } }
            localState.selectValue === GeoDataType.COUNTRY
                ? geoDataStore.retrieveCountries(filter)
                : retrieveCitiesUseCase.retrieveCities(filter)
        }
    }, [geoDataStore, localState.inputValue, localState.selectValue, retrieveCitiesUseCase])

    const handleCityElementClick = useCallback(
        (id: string) => (): void => {
            geoDataStore.setSelectedCityByID(id)
        },
        [geoDataStore]
    )

    return (
        <div className="loft-geodata-search-main">
            <div className="loft-geodata-search-wrapper">
                <span>Find the destination of your dreams:</span>
                <div className="loft-geodata-search-content">
                    <div className="loft-geodata-search-select-main">
                        <CustomTextfield
                            classes={{ root: 'loft-textfield-root smaller' }}
                            label="Type"
                            onChange={handleSelectValueChange}
                            select
                            size="small"
                            value={localState.selectValue}
                            variant="outlined"
                        >
                            {geoDataTypeSelectOptions.map(
                                (element: Readonly<TGeoDataTypeSelectOption>) => (
                                    <MenuItem key={element.value} value={element.value}>
                                        {element.label}
                                    </MenuItem>
                                )
                            )}
                        </CustomTextfield>
                    </div>

                    <div className="loft-geodata-search-input-main">
                        <CustomTextfield
                            classes={{ root: 'loft-textfield-root' }}
                            id="test"
                            label={localState.selectValue}
                            onChange={handleInputValueChange}
                            size="small"
                            variant="outlined"
                        />
                        <div className="loft-geodata-search-input-action-button">
                            <Button
                                classes={{
                                    root: 'loft-action-button-root smaller'
                                }}
                                color="primary"
                                onClick={handleSearch}
                                variant="contained"
                            >
                                Let&#39;s go!
                            </Button>
                        </div>
                    </div>
                </div>
                {!geoDataStore.hasGatewayLoadingStatus &&
                    geoDataStore.hasGatewaySuccessStatus &&
                    !geoDataStore.hasResult && (
                        <div className="loft-geodata-search-error-container">
                            <span>Ooops, there is no result ...</span>
                        </div>
                    )}
                {geoDataStore.hasGatewaySuccessStatus &&
                    geoDataStore.hasMultipleCitiesResult &&
                    !geoDataStore.selectedCity && (
                        <div className="loft-geodata-search-multiple-result-container">
                            <span className="loft-geodata-search-multiple-result-title">
                                We found multiple cities for your search:
                            </span>
                            {geoDataStore.cities?.map((city: DeepReadonly<TCity>) => (
                                <div
                                    className="loft-geodata-search-multiple-result-element-container"
                                    key={city.id}
                                    onClick={handleCityElementClick(city.id)}
                                >
                                    <LocationCityIcon />
                                    <span>{`${city.name} (${city.country?.name})`}</span>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    )
})
