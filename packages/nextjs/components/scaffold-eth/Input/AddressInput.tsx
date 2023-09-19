import { useCallback, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { isAddress } from "viem";
import { Address } from "viem";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

// ToDo:  move this function to an utility file
const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

/**
 * Address input with ENS name resolution
 */
export const AddressInput = ({ value, name, placeholder, onChange }: CommonInputProps<Address | string>) => {
  const { data: ensAddress, isLoading: isEnsAddressLoading } = useEnsAddress({
    name: value,
    enabled: isENS(value),
    chainId: 1,
    cacheTime: 30_000,
  });

  const [enteredEnsName, setEnteredEnsName] = useState<string>();
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({
    address: value as `0x${string}`,
    enabled: isAddress(value),
    chainId: 1,
    cacheTime: 30_000,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: Boolean(ensName),
    chainId: 1,
    cacheTime: 30_000,
  });

  // ens => address
  useEffect(() => {
    if (!ensAddress) return;

    // ENS resolved successfully
    setEnteredEnsName(value);
    onChange(ensAddress);
  }, [ensAddress, onChange, value]);

  const handleChange = useCallback(
    (newValue: Address) => {
      setEnteredEnsName(undefined);
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <InputBase<Address>
      name={name}
      placeholder={placeholder}
      error={ensAddress === null}
      value={value as `0x${string}`}
      onChange={handleChange}
      disabled={isEnsAddressLoading || isEnsNameLoading}
      suffix={
        ensName && (
          <div className="flex bg-base-300 rounded-l-full items-center">
            {ensAvatar ? (
              <span className="w-[20px]">
                {
                  // eslint-disable-next-line
                  <img className="w-full rounded-full" src={ensAvatar} alt={`${ensAddress} avatar`} />
                }
              </span>
            ) : null}
            <span className="text-accent px-2">{enteredEnsName ?? ensName}</span>
          </div>
        )
      }
      prefix={value && <Blockies seed={value?.toLowerCase() as string} size={5} scale={5} />}
    />
  );
};
